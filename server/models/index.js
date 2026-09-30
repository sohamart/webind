const bcrypt = require('bcryptjs');
const { isEmbedded } = require('../config/db');
const { store } = require('../config/mockStore');

// Mongoose Models
const MongooseAdmin = require('./Admin');
const MongooseBrand = require('./Brand');
const MongooseSiteSettings = require('./SiteSettings');
const MongooseMedia = require('./Media');
const MongooseActivityLog = require('./ActivityLog');

// Helper to filter array by MongoDB-like query
function matchesQuery(item, query = {}) {
  for (const [key, value] of Object.entries(query)) {
    if (key === '$or' && Array.isArray(value)) {
      const orMatched = value.some((subQuery) => matchesQuery(item, subQuery));
      if (!orMatched) return false;
      continue;
    }

    if (key === 'tags' && value?.$in) {
      const itemTags = item.tags || [];
      const hasMatch = value.$in.some((regex) =>
        itemTags.some((t) => (regex instanceof RegExp ? regex.test(t) : t === regex))
      );
      if (!hasMatch) return false;
      continue;
    }

    const itemVal = item[key];
    if (value instanceof RegExp) {
      if (!value.test(String(itemVal || ''))) return false;
    } else if (value && typeof value === 'object' && '$ne' in value) {
      if (itemVal === value.$ne) return false;
    } else if (itemVal !== value) {
      return false;
    }
  }
  return true;
}

// -------------------------------------------------------------
// ADAPTIVE ADMIN MODEL
// -------------------------------------------------------------
const Admin = {
  findOne(query) {
    if (!isEmbedded()) return MongooseAdmin.findOne(query);
    const email = query.email?.toLowerCase();
    const admin = store.data.admins.find((a) => a.email.toLowerCase() === email);
    const adminObj = admin
      ? {
          ...admin,
          async matchPassword(entered) {
            return await bcrypt.compare(entered, admin.password);
          },
          async save() {
            store.save();
            return this;
          },
        }
      : null;

    return {
      select() {
        return Promise.resolve(adminObj);
      },
      then(resolve, reject) {
        return Promise.resolve(adminObj).then(resolve, reject);
      },
    };
  },
  findById(id) {
    if (!isEmbedded()) return MongooseAdmin.findById(id);
    const admin = store.data.admins.find((a) => String(a._id) === String(id));
    const adminObj = admin
      ? {
          ...admin,
          async matchPassword(entered) {
            return await bcrypt.compare(entered, admin.password);
          },
          async save() {
            store.save();
            return this;
          },
        }
      : null;

    return {
      select() {
        return Promise.resolve(adminObj);
      },
      then(resolve, reject) {
        return Promise.resolve(adminObj).then(resolve, reject);
      },
    };
  },
  async create(data) {
    if (!isEmbedded()) return MongooseAdmin.create(data);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const newAdmin = {
      _id: store.generateId(),
      name: data.name || 'Webind Superadmin',
      email: data.email.toLowerCase(),
      password: hashedPassword,
      role: data.role || 'superadmin',
      avatar: data.avatar || '/assets/webind-symbol.png',
      lastLogin: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.data.admins.push(newAdmin);
    store.save();
    return newAdmin;
  },
  async countDocuments() {
    if (!isEmbedded()) return MongooseAdmin.countDocuments();
    return store.data.admins.length;
  },
};

// -------------------------------------------------------------
// ADAPTIVE BRAND MODEL
// -------------------------------------------------------------
const Brand = {
  find(query = {}) {
    if (!isEmbedded()) return MongooseBrand.find(query);

    const filtered = store.data.brands.filter((b) => matchesQuery(b, query));

    const chainable = {
      sort(sortObj = { displayOrder: 1 }) {
        const sorted = [...filtered].sort((a, b) => {
          if (sortObj.displayOrder !== undefined) {
            const orderDiff = (a.displayOrder || 0) - (b.displayOrder || 0);
            if (orderDiff !== 0) return sortObj.displayOrder === 1 ? orderDiff : -orderDiff;
          }
          if (sortObj.createdAt !== undefined) {
            const dateA = new Date(a.createdAt || 0).getTime();
            const dateB = new Date(b.createdAt || 0).getTime();
            return sortObj.createdAt === 1 ? dateA - dateB : dateB - dateA;
          }
          if (sortObj.name !== undefined) {
            return (a.name || '').localeCompare(b.name || '');
          }
          return 0;
        });
        return {
          then(resolve, reject) {
            return Promise.resolve(sorted).then(resolve, reject);
          },
          limit(n) {
            return Promise.resolve(sorted.slice(0, n));
          },
        };
      },
      then(resolve, reject) {
        return Promise.resolve(filtered).then(resolve, reject);
      },
    };

    return chainable;
  },

  async findOne(query) {
    if (!isEmbedded()) return MongooseBrand.findOne(query);
    const item = store.data.brands.find((b) => matchesQuery(b, query));
    return item ? { ...item } : null;
  },

  async findById(id) {
    if (!isEmbedded()) return MongooseBrand.findById(id);
    const item = store.data.brands.find((b) => String(b._id) === String(id));
    if (!item) return null;
    return {
      ...item,
      async save() {
        const idx = store.data.brands.findIndex((b) => String(b._id) === String(id));
        if (idx !== -1) {
          store.data.brands[idx] = { ...this, updatedAt: new Date().toISOString() };
          store.save();
        }
        return this;
      },
    };
  },

  async create(data) {
    if (!isEmbedded()) return MongooseBrand.create(data);
    const newBrand = {
      _id: store.generateId(),
      ...data,
      isFeatured: Boolean(data.isFeatured),
      isPublished: data.isPublished !== undefined ? Boolean(data.isPublished) : true,
      status: data.status || 'ACTIVE',
      displayOrder: data.displayOrder || store.data.brands.length + 1,
      products: data.products || [],
      services: data.services || [],
      gallery: data.gallery || [],
      tags: data.tags || [],
      socialUrls: data.socialUrls || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.data.brands.push(newBrand);
    store.save();
    return newBrand;
  },

  async findByIdAndUpdate(id, updateData, options = {}) {
    if (!isEmbedded()) return MongooseBrand.findByIdAndUpdate(id, updateData, options);
    const idx = store.data.brands.findIndex((b) => String(b._id) === String(id));
    if (idx === -1) return null;
    store.data.brands[idx] = {
      ...store.data.brands[idx],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };
    store.save();
    return store.data.brands[idx];
  },

  async findByIdAndDelete(id) {
    if (!isEmbedded()) return MongooseBrand.findByIdAndDelete(id);
    const idx = store.data.brands.findIndex((b) => String(b._id) === String(id));
    if (idx === -1) return null;
    const removed = store.data.brands.splice(idx, 1)[0];
    store.save();
    return removed;
  },

  async countDocuments(query = {}) {
    if (!isEmbedded()) return MongooseBrand.countDocuments(query);
    return store.data.brands.filter((b) => matchesQuery(b, query)).length;
  },

  async bulkWrite(ops) {
    if (!isEmbedded()) return MongooseBrand.bulkWrite(ops);
    for (const op of ops) {
      if (op.updateOne) {
        const id = op.updateOne.filter?._id;
        const update = op.updateOne.update?.$set;
        if (id && update) {
          const item = store.data.brands.find((b) => String(b._id) === String(id));
          if (item) {
            Object.assign(item, update);
            item.updatedAt = new Date().toISOString();
          }
        }
      }
    }
    store.save();
    return true;
  },

  async insertMany(items) {
    if (!isEmbedded()) return MongooseBrand.insertMany(items);
    const created = items.map((item, index) => ({
      _id: store.generateId(),
      ...item,
      displayOrder: item.displayOrder !== undefined ? item.displayOrder : index + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    store.data.brands.push(...created);
    store.save();
    return created;
  },
};

// -------------------------------------------------------------
// ADAPTIVE SITE SETTINGS MODEL
// -------------------------------------------------------------
const SiteSettings = {
  async findOne() {
    if (!isEmbedded()) return MongooseSiteSettings.findOne();
    return store.data.siteSettings;
  },

  async create(data) {
    if (!isEmbedded()) return MongooseSiteSettings.create(data);
    const settings = {
      _id: store.generateId(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.data.siteSettings = settings;
    store.save();
    return settings;
  },

  async findByIdAndUpdate(id, data, options = {}) {
    if (!isEmbedded()) return MongooseSiteSettings.findByIdAndUpdate(id, data, options);
    if (!store.data.siteSettings) {
      return this.create(data);
    }
    store.data.siteSettings = {
      ...store.data.siteSettings,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    store.save();
    return store.data.siteSettings;
  },
};

// -------------------------------------------------------------
// ADAPTIVE MEDIA MODEL
// -------------------------------------------------------------
const Media = {
  find(query = {}) {
    if (!isEmbedded()) return MongooseMedia.find(query);
    const filtered = store.data.media.filter((m) => matchesQuery(m, query));
    return {
      sort(sortObj = { createdAt: -1 }) {
        return Promise.resolve(
          [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        );
      },
      then(resolve, reject) {
        return Promise.resolve(filtered).then(resolve, reject);
      },
    };
  },

  async findById(id) {
    if (!isEmbedded()) return MongooseMedia.findById(id);
    return store.data.media.find((m) => String(m._id) === String(id)) || null;
  },

  async create(data) {
    if (!isEmbedded()) return MongooseMedia.create(data);
    const item = {
      _id: store.generateId(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.data.media.unshift(item);
    store.save();
    return item;
  },

  async findByIdAndDelete(id) {
    if (!isEmbedded()) return MongooseMedia.findByIdAndDelete(id);
    const idx = store.data.media.findIndex((m) => String(m._id) === String(id));
    if (idx === -1) return null;
    const item = store.data.media.splice(idx, 1)[0];
    store.save();
    return item;
  },

  async countDocuments(query = {}) {
    if (!isEmbedded()) return MongooseMedia.countDocuments(query);
    return store.data.media.filter((m) => matchesQuery(m, query)).length;
  },
};

// -------------------------------------------------------------
// ADAPTIVE ACTIVITY LOG MODEL
// -------------------------------------------------------------
const ActivityLog = {
  find(query = {}) {
    if (!isEmbedded()) return MongooseActivityLog.find(query);
    const filtered = store.data.activityLogs.filter((a) => matchesQuery(a, query));

    const chainable = {
      sort() {
        return this;
      },
      skip(s = 0) {
        this._skip = s;
        return this;
      },
      limit(l = 50) {
        this._limit = l;
        return this;
      },
      then(resolve, reject) {
        const sorted = [...filtered].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        const start = this._skip || 0;
        const end = this._limit ? start + this._limit : undefined;
        return Promise.resolve(sorted.slice(start, end)).then(resolve, reject);
      },
    };

    return chainable;
  },

  async create(data) {
    if (!isEmbedded()) return MongooseActivityLog.create(data);
    const log = {
      _id: store.generateId(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    store.data.activityLogs.unshift(log);
    // Keep max 500 logs
    if (store.data.activityLogs.length > 500) {
      store.data.activityLogs.pop();
    }
    store.save();
    return log;
  },

  async countDocuments(query = {}) {
    if (!isEmbedded()) return MongooseActivityLog.countDocuments(query);
    return store.data.activityLogs.filter((a) => matchesQuery(a, query)).length;
  },
};

module.exports = {
  Admin,
  Brand,
  SiteSettings,
  Media,
  ActivityLog,
};
