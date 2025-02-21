import React, { useState, useEffect } from 'react';
import jsonData from './input/input.json';
import ContractRenderer from './components/ContractRenderer'

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        //console.log('JSON Data:', JSON.stringify(jsonData, null, 2)); // Log formatted JSON
        setData(jsonData);
    }, []);

    if (!data) {
        //console.log('Data is not loaded yet.');
        return <div>Loading...</div>;
    }

    //console.log('Rendering with data:', data);
    return (
        <div className="p-8">
            <ContractRenderer data={data} />
        </div>
    );
}

export default App;