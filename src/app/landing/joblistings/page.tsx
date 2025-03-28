import { Suspense } from 'react';
import JobListingsPage from './JobListingsPage'; // default import since you used export default

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <JobListingsPage />
        </Suspense>
    );
}
