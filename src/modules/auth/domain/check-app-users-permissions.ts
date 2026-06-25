import { CheckAppUsersPermissionsPort } from '@purplelab/services-ui/login-ports';

const HEALTHNEXUS_INTERNAL_ADVERTISING_BUILDER_API = 'advertising/read';

const checkAppUsersPermissions: CheckAppUsersPermissionsPort = ({
  clientApis
}) => {
  const initialValue = true;

  const hasPermissions = [HEALTHNEXUS_INTERNAL_ADVERTISING_BUILDER_API].reduce(
    (hasPermissions, appPermission) => {
      return hasPermissions && clientApis.includes(appPermission);
    },
    initialValue
  );

  return hasPermissions;
};

export default checkAppUsersPermissions;
