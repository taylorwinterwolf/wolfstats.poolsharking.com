import React, { useState, useEffect } from 'react';
import { collection, getFirestore, getDocs } from 'firebase/firestore';
import { firebaseApp } from '../firebase';

const DisplayPlayers = () => {
    interface Player {
        id: number;
        completeName: string;
        fname: string;
        lname: string;
        nickName: string;
    }
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        const getPlayers = async () => {
            const db = getFirestore(firebaseApp);
            const playersCollectionRef = collection(db, "players");

            try {
                const querySnapshot = await getDocs(playersCollectionRef);
                const playersData: Player[] = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: data.id,
                        completeName: data.completeName,
                        fname: data.fname,
                        lname: data.lname,
                        nickName: data.nickName,
                    };
                });
                setPlayers(playersData);
            } catch (error) {
                console.error("Error fetching players: ", error);
            }
        };

        getPlayers();
    }, []); 
    return (
        <div>
            <p>Players:</p>
            {players.map(user => (
                <div key={user.id}>
                    <h2>Name: {user.completeName}</h2>
                </div>
            ))}
        </div>
    );
};

export default DisplayPlayers;



