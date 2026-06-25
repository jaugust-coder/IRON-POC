import useUserAuth from '@modules/auth/hooks/use-user-auth';
import { checkIsInternalClient } from '@purplelab/services-ui/check-client-type';
import {
  AUDIENCE_BUILDER_AUTHORIZE_AUDIENCE_PERMISSION,
  AUDIENCE_BUILDER_CREATE_CONTENT_PERMISSION
} from '@purplelab/services-ui/user-permissions';
import checkPermissions from '@purplelab/services-ui/check-permissions';
import { isApiAllowed } from '@purplelab/organisms-ui/validations-restrictions';
import { PERMISSIONS } from '@shared/domain/permissions';

const usePermissionValidations = () => {
  const { userAuthData, userAuthIsLoading } = useUserAuth();

  const { tagsList, permissions, clientApis } = userAuthData ?? {};

  const isInternalClient = checkIsInternalClient(tagsList);

  const isApiAllowedPermission = isApiAllowed({
    permissions: clientApis,
    typePermission: PERMISSIONS.INTERNAL_CONFIGURATION
  });

  const hasAudienceAuthorizeUserPermission =
    checkPermissions(permissions || [], [
      AUDIENCE_BUILDER_AUTHORIZE_AUDIENCE_PERMISSION
    ]) &&
    isInternalClient &&
    isApiAllowedPermission;

  const hasAudienceCreateContentUserPermission =
    checkPermissions(permissions || [], [
      AUDIENCE_BUILDER_CREATE_CONTENT_PERMISSION
    ]) &&
    isInternalClient &&
    isApiAllowedPermission;

  return {
    hasAudienceAuthorizeUserPermission,
    hasAudienceCreateContentUserPermission,
    userAuthIsLoading
  };
};

export default usePermissionValidations;
