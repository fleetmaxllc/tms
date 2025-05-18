import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const supabase = createClient(
  'https://hhnwrwkretympggpbmnw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhobndyd2tyZXR5bXBnZ3BibW53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUyMTk4MDQsImV4cCI6MjA0MDc5NTgwNH0.wYCeye0G01aKsGIwSc2tMcC4BvNWu7ckRVKLp7-4ocI'
);

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from('LoadData').select('*');
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setData(data);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Load Data Table</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                {data.length > 0 &&
                  Object.keys(data[0]).map((key) => (
                    <th key={key} style={{ backgroundColor: '#f0f0f0' }}>{key}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((val, idx) => (
                    <td key={idx}>{String(val)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
