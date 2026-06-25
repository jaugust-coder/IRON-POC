'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  usePopoverWithListBox
} from '@purplelab/atoms-ui/popover';
import { ListBox, ListOption } from '@purplelab/atoms-ui/list-option';
import { IconButton } from '@purplelab/atoms-ui/button';
import { SettingsIcon } from '@purplelab/icons-ui/SettingsIcon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@purplelab/atoms-ui/tooltip';
import { CONFIGURATIONS_AUDIENCES } from '../domain/configurations-audiences';
import PAGES_PATHS from '@shared/domain/pages';
import usePermissionValidations from '@shared/hooks/use-permission-validations';

export const AudienceConfigurationOptions = () => {
  const router = useRouter();

  const { popoverTriggerRef, listBoxRef, onOpenAutoFocus } =
    usePopoverWithListBox();

  const {
    hasAudienceAuthorizeUserPermission,
    hasAudienceCreateContentUserPermission
  } = usePermissionValidations();

  const authorizationPermission = hasAudienceAuthorizeUserPermission;

  const agenciesPermission = hasAudienceCreateContentUserPermission;

  const handleValueChange = (value: string) => {
    if (Object.values(CONFIGURATIONS_AUDIENCES).includes(value)) {
      router.push(`${PAGES_PATHS.audienceConfiguration}?tab=${value}`);
      return;
    }
    router.push(PAGES_PATHS.unauthorized);
  };

  const configurationOptions = useMemo(() => {
    return [
      {
        label: 'Authorization',
        value: CONFIGURATIONS_AUDIENCES.authorization,
        permission: authorizationPermission
      },
      {
        label: 'Destinations',
        value: CONFIGURATIONS_AUDIENCES.destinations,
        permission: agenciesPermission
      }
    ];
  }, [authorizationPermission, agenciesPermission]);

  return (
    <TooltipProvider>
      <Popover>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <IconButton
                variant="tertiary-subtle"
                size="sm"
                ref={popoverTriggerRef}
              >
                <SettingsIcon />
              </IconButton>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom" align="end" className="max-w-[200px]">
            <p>Configuration</p>
          </TooltipContent>
        </Tooltip>
        <PopoverContent
          className="z-[9999] w-[220px]"
          align="end"
          onOpenAutoFocus={onOpenAutoFocus}
        >
          <ListBox aria-label="Configuration options" ref={listBoxRef}>
            {configurationOptions.map((option) =>
              option.permission ? (
                <ListOption
                  key={option.value}
                  className="flex items-center"
                  onClick={() => handleValueChange(option.value)}
                >
                  {option.label}
                </ListOption>
              ) : null
            )}
          </ListBox>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
};

export default AudienceConfigurationOptions;
