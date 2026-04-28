import { Button, Card, Chip } from "@heroui/react";

import Image from "next/image";
import Link from "next/link";


const PhotoDetails = async({params}) => {
    const {id}= await params;
      const res= await fetch('https://pix-gen-beta.vercel.app/data.json')
    const photos= await res.json()
    const photo= photos.find(p=> p.id==id);
    console.log(photo);
    return (
        <div>
           <h2 className="text-5xl font-bold mb-3">Image Details</h2>
  
            <Card className="border rounded-xl">
                <div className="relative w-full aspect-square ">
                    <Image src={photo.imageUrl}  alt="image" fill  ></Image>
                    <Chip className="absolute right-2">{photo.category}</Chip>
                </div>
               
                <p>{photo.title}</p>
                <div className="flex gap-3">
                    <p>{photo.likes}</p>
                    <p>{photo.downloads}</p>
                </div>

              <Link href={'/'}>
                 <Button variant="outline">Back Home</Button>
              </Link>
            </Card>
 
          
        </div>
    );
};

export default PhotoDetails;