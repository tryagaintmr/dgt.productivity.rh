import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IDummyData } from '../shared/models/IDummyData';
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class DummyDataService {

  private readonly listName: string = "DummyData";

  constructor() {
    sp.setup({
      sp: {
        headers: {
          "Accept": "application/json; odata=nometadata"
        }
      }
    });
  }

  public async create(item: IDummyData): Promise<IDummyData> {
    const data = await sp.web.lists.getByTitle(this.listName).items.add(item);
    return { ...item, id: data.data.id };
  }

  public async read(id: number): Promise<IDummyData> {
    const data = await sp.web.lists.getByTitle(this.listName).items.getById(id).get();
    return { id: data.Id, ...data };
  }

  public async update(item: IDummyData): Promise<IDummyData> {
    await sp.web.lists.getByTitle(this.listName).items.getById(item.id).update(item);
    return item;
  }

  public async delete(id: number): Promise<void> {
    await sp.web.lists.getByTitle(this.listName).items.getById(id).delete();
  }

  public async getAll(): Promise<IDummyData[]> {
    try {
      const data = await sp.web.lists.getByTitle(this.listName).items.get();
      return data.map((item: any) => ({ id: item.Id, ...item }));
    } catch(ex: any) {
      console.log(ex);
    } finally {
      return Promise.resolve([]);
    }

  }

  public async getById(id: number): Promise<IDummyData> {
    const item = await sp.web.lists.getByTitle(this.listName).items.getById(id).get();
    return { id: item.id,
             title: item.title,
             dummyChoice: item.dummyChoice,
             dummyText: item.dummyText,
             dummyMultiplePerson: item.dummyMultiplePerson ? item.DummyMultiplePerson.results : [],
             dummyDateTime: new Date(item.DummyDateTime)
           };
  }

}
