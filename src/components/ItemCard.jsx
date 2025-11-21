import Image from "next/image";
import { MapPin, Calendar, Tag } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ItemCard({ item, onClick }) {
  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group border-slate-100"
      onClick={onClick}
    >
      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="text-xs font-normal">
            {item.categories?.label || item.category}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-slate-800 mb-2 line-clamp-1">
          {item.name}
        </h3>
        <div className="space-y-2 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-slate-400" />
            <span className="line-clamp-1">{item.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-slate-400" />
            <span>{item.date}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="w-full pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>ID: {item.id}</span>
          <span className="px-2 py-1 bg-slate-50 rounded-md text-slate-500 font-medium">
            รายละเอียดเพิ่มเติม
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
