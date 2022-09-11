import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ClipboardTextfield from 'components/ClipboardTextfield';
import DashboardLayout from 'components/DashboardLayout';
import Label from 'components/Label';
import { useInstanceList } from 'data/InstanceList';
import { LodestoneContext } from 'data/LodestoneContext';
import { useRouter } from 'next/router';
import {
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouterQuery } from 'utils/hooks';
import { pushKeepQuery, stateToLabelColor } from 'utils/util';
import { NextPageWithLayout } from './_app';

const Dashboard: NextPageWithLayout = () => {
  const lodestoneContex = useContext(LodestoneContext);
  const { query: uuid } = useRouterQuery('uuid');
  const { data: instances } = useInstanceList();

  const instance = useMemo(() => {
    if (uuid) return instances?.[uuid];
  }, [uuid, instances]);

  // TODO: add loading state, don't let it flash blank
  if (!uuid) return <></>;

  if (!instance) {
    return (
      <div className="px-12 py-10 bg-gray-800">
        <h1 className="-ml-4 font-semibold tracking-tight text-gray-300 text-2xlarge font-heading">
          Instance not found
        </h1>
      </div>
    );
  }

  const labelColor = stateToLabelColor[instance.state];

  return (
    <div className="px-12 py-10 bg-gray-800">
      <div className="flex flex-col items-start gap-4">
        <div className="flex flex-row items-center gap-10">
          <div className="flex flex-row items-center gap-4">
            {/* TODO: create a universal "text with edit button" component */}
            <h1 className="-ml-4 font-semibold tracking-tight text-gray-300 text-2xlarge font-heading">
              {instance.name}
            </h1>
            <FontAwesomeIcon
              className="text-gray-500 text-medium"
              icon={faPenToSquare}
            />
          </div>
          <div className="flex flex-row items-center gap-4">
            {/* TODO: create a universal game flavour image component */}
            <img
              src="/assets/minecraft-vanilla.png"
              alt={`${instance.game_type} logo`}
              className="w-8 h-8"
            />
            <Label size="large" color={labelColor}>
              {instance.state}
            </Label>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4">
          <Label size="large" color={labelColor}>
            Player Count {instance.player_count}/{instance.max_player_count}
          </Label>
          <Label
            size="large"
            color="gray"
            className="flex flex-row items-center gap-3"
          >
            <ClipboardTextfield
              text={`${lodestoneContex.address}:${instance.port}`}
              textToCopy={lodestoneContex.address}
            />
          </Label>
        </div>
        <div className="flex flex-row items-center gap-2">
          {/* TODO: create a universal "text with edit button" component */}
          <h1 className="italic font-medium tracking-tight text-gray-500 font-heading">
            {instance.description}
          </h1>
          <FontAwesomeIcon className="text-gray-500" icon={faPenToSquare} />
        </div>
      </div>
    </div>
  );
};

Dashboard.getLayout = (page: ReactElement): ReactNode => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Dashboard;
