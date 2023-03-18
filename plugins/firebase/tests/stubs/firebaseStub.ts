import firebase from 'firebase-admin'
import admin from 'firebase-admin'
import _ from 'lodash'
import sinon from 'sinon'

export const FIREBASE_TOKEN = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImIzMmIyNzViNDBhOWFjNGU1ZmQ0NTFhZTUxMDE4ZThlOTgxMmViNDYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVhY3Rpb24tdGVzdC00MWY4YSIsIm5hbWUiOiJUZXN0IERldmljZSIsInBpY3R1cmUiOiJodHRwczovL2xoNi5nb29nbGV1c2VyY29udGVudC5jb20vLVNKYUtyb3RzMDhFL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FLeHJ3Y1o5a1VJdjhITGtMRThNQnluRTBnVm5hOVhoeFEvczk2LWMvcGhvdG8uanBnIiwiYXVkIjoicmVhY3Rpb24tdGVzdC00MWY4YSIsImF1dGhfdGltZSI6MTU0NTkwNDExMiwidXNlcl9pZCI6Im5RWjlKWVRkNFllZmZqdm42dlBmQnlQUWN4TjIiLCJzdWIiOiJuUVo5SllUZDRZZWZmanZuNnZQZkJ5UFFjeE4yIiwiaWF0IjoxNTQ1OTA0MTEyLCJleHAiOjE1NDU5MDc3MTIsImVtYWlsIjoienZzeDAwMS54aW9taUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwNTM4ODY4MDA1MDQ3ODM3MDcyNiJdLCJlbWFpbCI6WyJ6dnN4MDAxLnhpb21pQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.e293aQuD8GWsfAswQU_xr8CqgRoBtjIECkDkw8rdzns2z5IvBnX-n_axgQ-olZ9UZsl4zAZuUy_BGOFyv7N43m23Nxaampxwht4mZCn0OSd5t_aBdsiYUF2i2hYT_1KOyWfgKRNcHy9CFtQaEWEnHtD3BNqFDoLD84xlvECuXDior8I9wwzFw36jl1Vn_6Reee9LcsQd8_MFqe4eDPvKaHEICZHCOtomCKJ3xFNVY4QQWTcAadZ_56bcnGp9wNKIOLkjXJOHWcYjv8MFeE7jswtffeSDO9x_hlQE9I6fpDlfQ_NHYy26TmlbOhEiYQ1r5rmsdh4QlNAgsu-8FyJZIA'
export const FIREBASE_TOKEN_NO_NAME = 'FIREBASE_TOKEN_NO_NAME'

export const decodedToken = {
  iss: 'https://securetoken.google.com/TEST',
  name: 'Test Firebase',
  picture: 'https://graph.facebook.com/235838577095522/picture',
  aud: 'test',
  auth_time: 1546435035,
  user_id: 'Sv0kIsDEAhPXfXhpUc5wMucqYE23',
  sub: 'Sv0kIsDEAhPXfXhpUc5wMucqYE23',
  iat: 1546435035,
  exp: 1546438635,
  email: 'firebase@mail.com',
  email_verified: false,
  phone_number: '+380980000000',
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
  uid: 'firebase-user-uid',
}

export const decodedTokenWithNoName = _.clone(decodedToken)
decodedTokenWithNoName.name = ' '
decodedTokenWithNoName.email = 'firebase-no-name@mail.com'
decodedTokenWithNoName.uid = 'no-token-uid'

sinon.stub(admin.credential, 'cert').returns({} as any)

export const stubFirebase = sinon.stub(firebase, 'initializeApp').get(() => () => ({
  auth() {
    return ({
      verifyIdToken(token) {
        if (token === FIREBASE_TOKEN_NO_NAME) return decodedTokenWithNoName

        return decodedToken
      },
    })
  },

} as any))
// const stub = sinon.stub(Auth.prototype, 'verifyIdToken')
// stub.withArgs(FIREBASE_TOKEN_NO_NAME).returns(Promise.resolve(decodedTokenWithNoName))
// stub.returns(Promise.resolve(decodedToken))

// export default stub
