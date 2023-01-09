export const schema = {
  models: {
    EventTypes: {
      name: 'EventTypes',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: [],
        },
        name: {
          name: 'name',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: [],
        },
        enabled: {
          name: 'enabled',
          isArray: false,
          type: 'Boolean',
          isRequired: false,
          attributes: [],
        },
        createdAt: {
          name: 'createdAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
        updatedAt: {
          name: 'updatedAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
      },
      syncable: true,
      pluralName: 'EventTypes',
      attributes: [
        {
          type: 'model',
          properties: {},
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                allow: 'public',
                operations: ['create', 'update', 'delete', 'read'],
              },
            ],
          },
        },
      ],
    },
    Event: {
      name: 'Event',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: [],
        },
        name: {
          name: 'name',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: [],
        },
        startDate: {
          name: 'startDate',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
        },
        endDate: {
          name: 'endDate',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
        },
        is_done: {
          name: 'is_done',
          isArray: false,
          type: 'Boolean',
          isRequired: false,
          attributes: [],
        },
        map_point: {
          name: 'map_point',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: [],
        },
        types: {
          name: 'types',
          isArray: true,
          type: 'ID',
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
        },
        user: {
          name: 'user',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: [],
        },
        descripcion: {
          name: 'descripcion',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: [],
        },
        subTitulo: {
          name: 'subTitulo',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: [],
        },
        createdAt: {
          name: 'createdAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
        updatedAt: {
          name: 'updatedAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
      },
      syncable: true,
      pluralName: 'Events',
      attributes: [
        {
          type: 'model',
          properties: {},
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                allow: 'public',
                operations: ['create', 'update', 'delete', 'read'],
              },
            ],
          },
        },
      ],
    },
  },
  enums: {},
  nonModels: {},
  codegenVersion: '3.3.2',
  version: '428b8d44cc64c9cbc182b52ec2166776',
}
