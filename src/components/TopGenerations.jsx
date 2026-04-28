import PhotoCard from "./PhotoCard";


const TopGenerations = async() => {
    const res= await fetch('https://pix-gen-beta.vercel.app/data.json')
    const photos= await res.json()
    const topPhotos=photos.slice(0,8)
    return (
        <div>
            <h1 className="font-bold text-2xl mt-2">Top generations</h1>
            <ul className="grid grid-cols-4 gap-2">
              {
                topPhotos.map(photo => <PhotoCard key={photo.id} photo={photo}></PhotoCard>)
              }
            </ul>
        </div>
    );
};

export default TopGenerations;