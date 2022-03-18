# 비대칭키를 활용한 대칭키 암호화 통신 확립(Establish) 프로세스

> **해당 기법은 https process에서 아이디어를 얻은 것으로, 일반 http 통신 상에서의 보안 문제 해결 및 폭 넓게는 client side와 server side 간의 암호화를 통한 API통신 상의 보안 강화를 목적으로 개발 진행하였습니다.**

# 1. 개요

- **http 통신의 문제점**
  ![Untitled](https://user-images.githubusercontent.com/52296323/158989051-6fbc73e9-8a8c-4f85-9d3a-912f508a665e.png)
  - 일반적인 http 통신의 가장 큰 문제점은 packet에 body로 담았던 데이터가 고스란히 보인다는 단점을 가진다. ( Sniffing 공격에 취약하다. )
  → 그래서 실제로 서비스 되고 있는 웹 서비스들은 사용자의 개인정보와 같은 민감데이터를 보호하기 위하여 https프로토콜로 암호화 통신을 한다.
- **Client Side 에서의 Key관리 문제점**
  ![Untitled 1](https://user-images.githubusercontent.com/52296323/158989069-9c9cbd45-9a6f-4df5-967b-2b5152a8f614.png)
  - 필자는 자바스크립트를 이용하기 때문에 .env 파일을 예로 들어 설명하자면, 우리가 외부에 소스를 올릴 때, 민감 키 값, 예로들면 암호화 통신을 위해 사용하는 키를 감추기 위해 .env 파일을 이용한다.
  - 하지만 이와 같이 특정 파일에 키를 넣고, 이를 읽는 방식은 소스 상에서는 숨겼지만, 정작 사용자에게 최종적으로 전송되는 웹 페이지에서는 노출이 된다는 것 이다. 즉, 하드코딩의 방식과 차이가 없다는 것 이다.
  → 그래서 서버에 키를 저장하고, client side에서 이 키를 사용해야 할 때 요청해서 변수에 담아놓고,(사용자의 메모리) 이용을 하기도 한다. 하지만 이도 HTTP를 이용하고 있다면, 패킷 상에 노출이 되는 정보 중에 하나이기 때문에 HTTPS 통신이 아니면 이도 보안상의 의미가 없어진다.

> **Session Cert Project는 HTTPS가 적용되지 않은 HTTP API 통신상에 암호화를 구현하기 위하여 계획했다.**

- 큰 흐름은 HTTPS와 같다. HTTPS에서 암호화 통신을 하기 위해 CA에 HTTPS를 지원하는 서버의 인증서를 확인시키고, 공개키를 받아 대칭키를 생성하고, 공개키를 통해 대칭키를 암호화하고, 서버는 이를 개인키로 복호화하여 **통신상에서 원본 대칭키를 유출하지 않고**, **Client Side와 Server Side는 각자 같은 대칭키를 가지고 있는 상태에서 암호화 통신을 시작**한다.
- **session cert는 인증서를 검증하는 CA만 없을 뿐, 비대칭키를 통한 암호화 통신에 쓰일 대칭키를 암호화하여, 통신상에서 원본 대칭키가 유출되지 않도록 하는 방식을 이용한다.**
- **방향성**
  - 소스 상에 통신 암호화 키가 노출이 되지 않도록, Client Side에서는 브라우저 변수. 즉, 사용자의 메모리에 할당되도록 관리해야 한다.
  - 통신 상에서 대칭키는 원본으로 전달돼서는 안된다.

# 2. Session Cert Process

| 대분류    | 소분류                               | 주체          | 설명                                                                                                                                  |
| --------- | ------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| INIT      | GET /publicKey                       | client        | 통신상에서 대칭키를 암호화하여 전달할 공개키를 서버에 요청한다.                                                                       |
|           | 공개키와 비밀키 생성                 | server        | 요청자를 위한 공개키와 비밀키를 생성한다.                                                                                             |
|           | 공개키 응답                          | server        |                                                                                                                                       |
|           | 대칭키 생성                          | client        | 32Byte 크기의 랜덤한 값의 조합으로 대칭키 생성                                                                                        |
|           | 공개키로 대칭키 암호화               | client        |                                                                                                                                       |
|           | POST /symmetricKey                   | client        | 대칭키 등록                                                                                                                           |
| MATCHING  | 비밀키로 대칭키 복호화               | server        |                                                                                                                                       |
|           | 테스트 문자열 생성                   | server        | 32Byte 크기의 랜덤한 값의 조합으로 테스트 문자열 생성                                                                                 |
|           | 대칭키로 테스트 문자열 암호화        | server        | 비밀키로 복호화 한, 대칭키로 테스트 문자열을 암호화한다.                                                                              |
|           | 암호화 Body로 응답                   | server        |                                                                                                                                       |
|           | 대칭키로 암호화 Body 복호화          | client        |                                                                                                                                       |
|           | 복호화한 Body를 대칭키로 다시 암호화 | client        |                                                                                                                                       |
|           | POST /establish                      | client        | 테스트 문자열이 담겨져 있는 암호화 Body를 복호화 한 후 다시 암호화하여 보낸다.                                                        |
|           | 대칭키로 암호화 Body 복호화          | server        |                                                                                                                                       |
|           | 테스트 문자열 비교                   | server        | 자신이 생성한 테스트 문자열을 복호화로 정확하게 복원했는지, 암호화를 다시 했을 때, 서버 측에서도 복호화 잘 되었는지 확인한다.         |
| ESTABLISH | 암호화 통신 진행                     | client-server | 서버 측에서 테스트 문자열 검증이 끝났다면, 같은 대칭키를 가지고 있음이 검증된다. 이로써 해당 대칭키를 가지고, 암호화 통신을 진행한다. |

- 위의 과정들을 보면, server에서 Database를 사용하고 있다는 것을 확인할 수 있다. 공개키와 비밀키 생성 시점에 Database에 해당 내용이 저장되며, 여기서 auto_increment로 primary key가 발급된다.
  → 해당 DB의 행 한줄이 요청한 client의 인증서 역할을 하게 되는 셈이다.

**즉, server가 인증서를 생성하고, 관리하는 HTTPS에서의 CA역할을 하고 있는 것 이다.**

# 3. Session Cert Run

## 1. INIT

![Untitled 2](https://user-images.githubusercontent.com/52296323/158989088-516b978f-f05e-40ab-af28-4c7b9515a881.png)

### 1. client : GET /publicKey

![Untitled 3](https://user-images.githubusercontent.com/52296323/158989099-62bb7f02-27c5-467d-86e2-14e06922ac20.png)

### 2. server : 공개키와 비밀키 생성

```tsx
const passphrase = getRandomBytes(32);
const keyPair = await _generateKeyPair(passphrase);

try {
  const sessionCert = await SessionCertModel.create({
    passphrase,
    ...keyPair,
  });

// ...
```

### 3. server : 공개키 응답

![Untitled 4](https://user-images.githubusercontent.com/52296323/158989121-1136733a-d2e6-4b46-aeed-85467f974285.png)

### 4. client : 대칭키 생성

![Untitled 5](https://user-images.githubusercontent.com/52296323/158989133-ba642b61-8aab-4820-94f3-c73f289f9c82.png)

```tsx
const symmetricKey = getRandomBytes(32);
```

### 5. client : 공개키로 대칭키 암호화

```tsx
const encSymmetricKey = publicEncrypt(
  this.publicKey,
  Buffer.from(symmetricKey)
).toString("base64");
```

### 6. client : POST /symmetricKey

![Untitled 6](https://user-images.githubusercontent.com/52296323/158989148-85a8bf59-4d4d-4018-86c8-b3315414f78b.png)

## 2. MATCHING

### 1. server : 비밀키로 대칭키 복호화

```tsx
const _symmetricKey = privateDecrypt(
  key,
  Buffer.from(body.symmetricKey.toString(), "base64")
).toString("utf8");
```

### 2. server : 테스트 문자열 생성

```tsx
const testString = getRandomBytes(32);
```

### 3. server : 대칭키로 테스트 문자열 암호화

```tsx
const encResBody = CryptoJS.AES.encrypt(
  JSON.stringify(resBody),
  _symmetricKey
).toString();
```

![Untitled 7](https://user-images.githubusercontent.com/52296323/158989173-108c891c-3b0e-436e-801d-ed5127a83c0a.png)

### 4. server : 암호화 Body로 응답

![Untitled 8](https://user-images.githubusercontent.com/52296323/158989186-ca597db6-8379-4c07-85fa-8e1bb902ebe8.png)

### 5. client : 대칭키로 암호화 Body 복호화

![Untitled 9](https://user-images.githubusercontent.com/52296323/158989195-d8d510d9-f9c8-4a4c-bff3-fcb653211cc2.png)

```tsx
const decBodyWord = CryptoJS.AES.decrypt(this.encBody!, this.symmetricKey!);
const decBody = JSON.parse(decBodyWord.toString(CryptoJS.enc.Utf8));
```

### 6. client : 복호화한 Body를 대칭키로 다시 암호화

```tsx
const encBody = CryptoJS.AES.encrypt(
  JSON.stringify(decBody),
  this.symmetricKey!
).toString();
```

### 7. client : POST /establish

![Untitled 10](https://user-images.githubusercontent.com/52296323/158989211-a2995d88-da07-423c-9397-9f2e4d7274c6.png)

### 8. server : 대칭키로 암호화 Body 복호화

```tsx
const decBodyWord = CryptoJS.AES.decrypt(encBody, symmetricKey);
const decBody = JSON.parse(decBodyWord.toString(CryptoJS.enc.Utf8));

const { testString: _testString } = decBody;
```

### 9. server : 테스트 문자열 비교

```tsx
if (testString === _testString) {
  return res.status(200).json({
    status: true,
    message: "session cert 설정이 완료되었습니다.",
  });
} else {
  throw new Error("테스트 문자열이 일치하지 않습니다.");
}
```

## 3. ESTABLISH : 암호화 통신 진행

![Untitled 11](https://user-images.githubusercontent.com/52296323/158989228-0fd83db5-a405-4bed-b2d8-752c31b4a587.png)

![Untitled 12](https://user-images.githubusercontent.com/52296323/158989249-c818f30e-7eb7-4108-82b1-93cc289141d5.png)

![Untitled 13](https://user-images.githubusercontent.com/52296323/158989259-c3d51485-e397-4c16-af01-e972b5fb9817.png)

![Untitled 14](https://user-images.githubusercontent.com/52296323/158989271-feb6946f-5220-4ae4-b6d8-e8556e33b739.png)

![Untitled 15](https://user-images.githubusercontent.com/52296323/158989287-327d44f9-c7e0-4777-bcda-6d5bdfb16ff2.png)

![Untitled 16](https://user-images.githubusercontent.com/52296323/158989296-b492cd25-08b4-43ae-8e26-ff459aaca8f6.png)

- node.js 진영의 웹 서버 구축에서는 미들웨어를 사용하여, 요청부터 응답까지의 연결을 자유롭게 할 수 있다.
  - 암호화 통신 테스트용 api인 /apiTest로 들어온 요청들에 대하여 인증서 번호를 확인하고 대칭키를 조회하여 복호화 한 후, API 처리를 하도록 하는 미들웨어 decryptBody, API 처리 후 응답에 대하여 요청자의 인증서 대칭키를 사용해서 응답을 암호화하도록 하는 미들웨어 encryptBody를 앞 뒤로 연결해놓았다.
  ```tsx
  this.routes.use("/apiTest", decryptBody, apiTest, encryptBody);
  ```
