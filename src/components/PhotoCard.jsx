import { Button, Card, Chip } from "@heroui/react";
import Image from "next/image";


const PhotoCard = ({photo}) => {
    return (
        <div>
            <Card className="border rounded-xl">
                <div className="relative w-full aspect-square cursor-pointer hover:scale-105">
                    <Image src={photo.imageUrl}  alt="image" fill  ></Image>
                    <Chip className="absolute right-2">{photo.category}</Chip>
                </div>
               
                <p>{photo.title}</p>
                <div className="flex gap-3">
                    <p>{photo.likes}</p>
                    <p>{photo.downloads}</p>
                </div>

                <Button variant="outline" className={`w-full`}>View</Button>
            </Card>
        </div>
    );
};

export default PhotoCard;