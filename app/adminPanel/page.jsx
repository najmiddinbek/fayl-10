
import Remove from "../../components/RemoveBtn";
import Navbar from "../../components/Navbar";

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

export default async function TopicsList() {
    const { topics } = await getTopics()

    const maktablar = Array.from({ length: 54 }, (_, index) => index + 1);

    const getRowBackgroundColor = (index) => {
        if (index % 2 === 0) {
            return "bg-white";
        } else if (index % 2 === 1) {
            return "gray";
        }
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="h-[2px] w-full bg-gray-100 mt-8"></div>
                <h1 className="text-4xl my-5">Ayni vaqtda darsda qatnashmagan o`quvchilar ro`yxati</h1>
                <table className="w-full shadow-xl">
                    <thead className="green text-white font-bold poppins-2">
                        <tr>
                            <th className="py-5 px-2 poppins-2">№</th>
                            <th className="py-4 px-2 poppins-2">FIO</th>
                            <th className="py-4 px-2 poppins-2">Telefon raqam</th>
                            <th className="py-4 px-2 poppins-2">Maktab</th>
                            <th className="py-4 px-2 poppins-2">Dars qoldirish</th>
                            <th className="py-4 px-2 poppins-2">Sinf</th>
                            <th className="py-4 px-2 poppins-2">Yaratilgan vaqti</th>
                            <th className="py-4 px-2 poppins-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {topics.map((t, index) => (
                            <tr key={t.id} className={`text-center ${getRowBackgroundColor(index)}`}>
                                <td className="px-2 py-4">{index + 1}</td>
                                <td className="px-2 py-4">{t.newIsm}</td>
                                <td className="px-2 py-4">{t.telephoneRaqami}</td>
                                <td className="px-2 py-4">{t.school}</td>
                                <td className="px-2 py-4">{t.newDarsQoldirish}</td>
                                <td className="px-2 py-4">{t.newSinfi}</td>
                                <td className="px-2 py-4">{new Date(t.createdAt).toLocaleString()}</td>
                                <td className="px-2 py-4">
                                    <div className="flex gap-2 justify-center">
                                        <Remove id={t._id} />
                                    </div>
                                </td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}