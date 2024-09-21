import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';

const PackagePage = () => {
  const { packageName } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await fetch(`https://registry.npmjs.org/${packageName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch package details');
        }
        const data = await response.json();
        console.log("API Response: ", data);  // Logging API response for debugging
        setPackageData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackageDetails();
  }, [packageName]);

  if (loading) {
    return <p>Loading package details...</p>;
  }

  if (error) {
    return <p>Error fetching package details: {error}</p>;
  }

  if (!packageData) {
    return <p>No package details found</p>;
  }

  // Get the latest version
  const latestVersion = packageData['dist-tags']?.latest;
  const latestVersionData = packageData.versions?.[latestVersion];

  // Debug each field step-by-step to ensure it's not undefined
  console.log("Package Data: ", packageData);
  console.log("Latest Version: ", latestVersion);
  console.log("Latest Version Data: ", latestVersionData);

  return (
    <>
      <NavBar />
      <hr />
      <div className='package-page'>
        <h1>{packageData.name || 'Package Name Not Available'}</h1>
        <p><strong>Description:</strong> {packageData.description || 'No description available'}</p>
        <p><strong>Latest Version:</strong> {latestVersion || 'No latest version available'}</p>
        <p><strong>License:</strong> {latestVersionData?.license || 'N/A'}</p>
        <p><strong>Repository:</strong>
          {latestVersionData?.repository?.url ? (
            <a href={latestVersionData.repository.url} target="_blank" rel="noopener noreferrer">
              {latestVersionData.repository.url}
            </a>
          ) : 'N/A'}
        </p>
        <p><strong>Author:</strong> {latestVersionData?.author?.name || 'Unknown'} ({latestVersionData?.author?.email || 'N/A'})</p>
        <p><strong>Created:</strong> {new Date(packageData.time?.created).toLocaleString() || 'N/A'}</p>
        <p><strong>Modified:</strong> {new Date(packageData.time?.modified).toLocaleString() || 'N/A'}</p>

        <h2>Dependencies:</h2>
        {latestVersionData?.dependencies ? (
          <ul>
            {Object.entries(latestVersionData.dependencies).map(([dep, version]) => (
              <li key={dep}>{dep}: {version}</li>
            ))}
          </ul>
        ) : (
          <p>No dependencies found for this version.</p>
        )}

        <h2>Dev Dependencies:</h2>
        {latestVersionData?.devDependencies ? (
          <ul>
            {Object.entries(latestVersionData.devDependencies).map(([dep, version]) => (
              <li key={dep}>{dep}: {version}</li>
            ))}
          </ul>
        ) : (
          <p>No devDependencies found for this version.</p>
        )}

        <h2>Maintainers:</h2>
        {packageData.maintainers?.length > 0 ? (
          <ul>
            {packageData.maintainers.map((maintainer, index) => (
              <li key={index}>{maintainer.name} ({maintainer.email})</li>
            ))}
          </ul>
        ) : (
          <p>No maintainers listed for this package.</p>
        )}

        <h2>README:</h2>
        <div style={{ whiteSpace: 'pre-wrap', border: '1px solid #ccc', padding: '10px', background: '#f9f9f9', overflowX: 'auto' }}>
          {latestVersionData?.readme || 'No README available'}
        </div>
      </div>
    </>
  );
};

export default PackagePage;
