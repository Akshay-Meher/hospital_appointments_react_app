import React, { Suspense } from 'react'
import PageLoader from '../components/PageLoader';

function NormalRoute({ children }) {
    return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

export default NormalRoute