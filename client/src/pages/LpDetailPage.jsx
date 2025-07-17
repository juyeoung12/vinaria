import { useParams, useLocation } from "react-router-dom";

const LpDetailPage = () => {
  const { id } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const type = query.get("type"); // audio 또는 purchase

  return (
    <div className="text-white px-24 py-16">
      <h1 className="text-3xl font-bold mb-4">LP 상세 페이지</h1>
      <p className="text-gray-400">ID: {id}</p>
      <p className="text-gray-400">타입: {type === "audio" ? "음원 감상" : "구매"}</p>
    </div>
  );
};

export default LpDetailPage;
