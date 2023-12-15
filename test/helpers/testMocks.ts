import { v4 as uuid } from 'uuid'

const localization = {
  locale: 'UA',
  calendar: 'gregorian',
  timeZone: 'Europe/Kiev',
  hours24: false,
  locales: [{
    countryCode: 'UA', languageTag: 'uk-UA', languageCode: 'uk', isRTL: false,
  }],
}

function createDevice(device_id?: string) {
  if (!device_id) device_id = uuid()

  return {
    id: device_id,
    device_id,
    brand: 'nokia',
    bundleId: 'com.reaction', // or "com.reactioncoach"
    carrier: 'KYIVSTAR',
    deviceCountry: 'UA',
    deviceLocale: 'uk-UA',
    // device_id: "universal7580",
    manufacturer: 'Nokia',
    model: '11000',
    phoneNumber: null,
    systemName: 'IOS',
    systemVersion: '9.9.9',
    timezone: 'Europe/Kiev',
    localization,
  }
}

function createProgram(name) {
  return {
    name: name || 'program.test',
    description: 'Description test program',
    milestones: [
      {
        id: 0,
        name: 'test.milestone.1',
        description: 'Description 1',
        period: '1',
        tasks: [
          {
            name: 'Task 2',
            shortDescription: 'Logn dfasdf',
            description: 'Sjtpred l',
            points: 3,
          },
          {
            name: 'dfa',
            shortDescription: 'dfasf',
            description: 'efadfds',
            points: 2,
          },
        ],
      },
      {
        id: 1,
        name: 'test.milestone.2',
        description: 'Descriptinf ',
        period: '3',
        tasks: [
          {
            milestone: 1,
            name: 'tasdf',
            description: 'dfas',
            points: 3,
            shortDescription: 'dfads',
          },
        ],
      },
      {
        id: 2,
        name: 'test.milestone.3',
        description: 'dfa',
        period: '1',
        tasks: [],
      },
    ],
  }
}

function createExtendedProgram(name) {
  return {
    name: name || 'program-extended.test',
    description: 'Description test program',
    milestones: [
      {
        id: 0,
        name: 'test.milestone.1',
        description: 'Description 1',
        period: '1',
        tasks: [
          {
            name: 'Task 2',
            shortDescription: 'Logn dfasdf',
            description: 'Sjtpred l',
            points: 1,
            asset_type: 'image',
            asset_url: 'https://bloximages.chicago2.vip.townnews.com/tribdem.com/content/tncms/assets/v3/editorial/3/83/38384be2-3ba5-11e8-adec-bf48bc62810f/5acadc92f3c7d.image.jpg?resize=1200%2C1070',
            comments: [
              'comment 1',
              'comment 2',
            ],
            mentions: [
              { title: '1', body: 'point' },
              { title: '2', body: 'points' },
            ],
          },
          {
            name: 'dfa',
            shortDescription: 'dfasf',
            description: 'efadfds',
            points: 2,
            asset_type: 'video',
            asset_url: 'https://youtu.be/Gz2GVlQkn4Q?list=PLiC8tlsPffb0-wk-8mLkSJwN6x0IUo9Zj',
          },
        ],
      },
    ],
  }
}

const createPlaybookType = (playbookTypeName = null) => ({
  name: playbookTypeName || 'playbooktype.web.test',
  color: '#fff',
  thumb: '31231',
  description: 'test',
})

const decodedToken = {
  iss: 'https://securetoken.google.com/reaction-test-41f8a',
  name: 'Test Firebase',
  picture: 'https://graph.facebook.com/235838577095522/picture',
  aud: 'reaction-test-41f8a',
  auth_time: 1546435035,
  user_id: 'Sv0kIsDEAhPXfXhpUc5wMucqYE23',
  sub: 'Sv0kIsDEAhPXfXhpUc5wMucqYE23',
  iat: 1546435035,
  exp: 1546438635,
  email: 'firebase@mail.com',
  email_verified: false,
  phone_number: '+380638827867',
  firebase: {
    identities: {
      'facebook.com': [
        '111111',
      ],
      email: [
        'firebase@mail.com',
      ],
    },
    sign_in_provider: 'facebook.com',
  },
  uid: 'xxxxx',
}

export default {
  createDevice,
  createProgram,
  createExtendedProgram,
  createPlaybookType,
  decodedToken,
}
