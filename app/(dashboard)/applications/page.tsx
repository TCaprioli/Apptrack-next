import { ApplicationApi } from "../../../server/applications";
import { ApplicationView } from "../../../features/applications/components/ApplicationView";

export default async function Applications() {
  const applications = await ApplicationApi.getAllApplications();
  return (
    <div>
      <ApplicationView applications={applications} />
    </div>
  );
}
