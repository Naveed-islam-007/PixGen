import PhotoCard from "@/components/PhotoCard";


const AllPhotos = async() => {
     const res= await fetch('https://pix-gen-beta.vercel.app/data.json')
    const photos= await res.json()
    return (
        <div>
             <div>
            <h1 className="font-bold text-2xl my-5">All Photos</h1>
            <ul className="grid grid-cols-4 gap-2">
              {
                photos.map(photo => <PhotoCard key={photo.id} photo={photo}></PhotoCard>)
              }
            </ul>
        </div>
        </div>
    );
};

export default AllPhotos;