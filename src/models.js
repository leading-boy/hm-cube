const { default: mongoose } = require('mongoose');

const keySchema = new mongoose.Schema(
  {
    bike: {
      type: mongoose.SchemaTypes.Array,
    },
    cube: {
      type: mongoose.SchemaTypes.Array,
    },
    cube_token: {
      type: mongoose.SchemaTypes.String,
    },
    isRefreshToken: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const Key = mongoose.model('Key', keySchema);

module.exports = { Key };
