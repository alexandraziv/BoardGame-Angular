export class Game {
    _id: number;
    name: string;
    description: string;
    publish_date: string;
    categories: string[];
    rating: number;

    constructor(obj?: any) {
        this._id = obj && obj._id || null;
        this.name = obj && obj.name || null;
        this.description = obj && obj.description || null;
        this.publish_date = obj && obj.publish_date || null;
        this.categories = obj && obj.categories || null;
        this.rating = obj && obj.rating || null;
    }
}