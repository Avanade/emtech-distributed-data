const confidentialLedgerBackend="http://cl-api.dev:5000/";

export async function readLedger(vehicleId: string) {
    try {
        const res = await fetch(confidentialLedgerBackend + "read/" + vehicleId)
        return await res.json()
    } catch (err) {
        console.error(err);
        console.error(`Error in readLedger with vehicleId ${vehicleId}`);
    }
}

export async function appendLedger(vehicleId: string, dataToAppend: any) {
    try {
        const res = await fetch(
            confidentialLedgerBackend + "append",
            {
                body: dataToAppend,
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
        )

        return await await res.json();
    } catch (err) {
        console.error(`Error in appendLedger with vehicleId ${vehicleId}`);
    }
}