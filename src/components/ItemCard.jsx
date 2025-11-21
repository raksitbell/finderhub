import Image from "next/image";
import { MapPin } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ItemCard({ item, onClick }) {
  return (
    <Card
      className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-slate-100 bg-white"
      onClick={onClick}
    >
      <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <Badge className="bg-white/90 text-slate-800 hover:bg-white shadow-sm backdrop-blur-sm border-0">
            {item.categories?.label || item.category}
          </Badge>
        </div>
      </div>
      <CardContent className="p-5">
        <h3 className="font-bold text-lg text-slate-800 mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {item.name}
        </h3>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <MapPin className="h-4 w-4 text-slate-400 flex-shrink-0" />
          <span className="line-clamp-1">{item.location}</span>
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <div className="w-full pt-4 border-t border-slate-50 flex justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200"
          >
            ดูรายละเอียด
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
