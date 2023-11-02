const getTopics = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/topics", {
            cache: "no-store",
        });
        if (!res.ok) {
            throw new Error("Failed to fetch topics");
        }

        return res.json();
    } catch (error) {
        console.log("Error loading topics: ", error);
        throw error;
    }
};

import React from 'react'

export default async function Tanlash() {
    const { topics } = await getTopics()
    return (
        <div>

            <select>
                {topics.map((topic, index) => (
                    <option value={topic}>{topic}</option>
                ))}
            </select>
        </div>
    )
}
