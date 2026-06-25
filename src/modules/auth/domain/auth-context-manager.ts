import { AuthTokens } from '@purplelab/services-ui/token';
import { InternalApiTokenData } from '@purplelab/services-ui/internal-api-token';

export type AuthContextManagerProps = AuthTokens & InternalApiTokenData;

class AuthContextManager {
  private static instance: AuthContextManager;
  private readonly _data: Partial<AuthContextManagerProps>;

  private constructor(tokens: AuthTokens) {
    this._data = tokens;
  }

  public static initialize(tokens: AuthTokens): AuthContextManager {
    AuthContextManager.instance = new AuthContextManager({
      ...AuthContextManager.instance?._data,
      ...tokens
    });

    return AuthContextManager.instance;
  }

  public static setUserData(data: InternalApiTokenData): void {
    if (!AuthContextManager.instance) {
      throw new Error('AuthContextManager initialize needs to be setup first');
    }

    const { userId, clientId, privateInternalApiKey } = data;
    AuthContextManager.instance._data.userId = userId;
    AuthContextManager.instance._data.clientId = clientId;
    AuthContextManager.instance._data.privateInternalApiKey =
      privateInternalApiKey;
  }

  public static getInstance(): AuthContextManagerProps {
    if (!AuthContextManager.instance) {
      throw new Error('AuthContextManager initialize needs to be setup first');
    }

    return AuthContextManager.instance._data;
  }
}

export default AuthContextManager;
