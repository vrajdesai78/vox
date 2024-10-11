import exploreData from "@/utils/explore";

const ExploreItemPage = async ({ params }: { params: { id: string } }) => {
  const item = exploreData[parseInt(params.id)];

  return (
    <div>
      <h1>{item.title}</h1>
      <img src={item.bgImage} alt={item.title} />
    </div>
  );
};

export default ExploreItemPage;
