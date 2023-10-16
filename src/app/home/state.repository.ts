import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { select, withProps, createStore, setProp } from '@ngneat/elf';
import {
  addEntities,
  selectAllEntities,
  selectAllEntitiesApply,
  updateEntities,
  withEntities,
} from '@ngneat/elf-entities';
import { IState, IDocument, DocumentProps, IValidationNode, EDocumentStatus, IActorAction } from './IInterfaces';
import { devTools } from '@ngneat/elf-devtools';

devTools();
const documentStore = createStore(
  { name: 'documents'},
  withProps<DocumentProps>({ filter: 'ALL'}),
  withEntities<IDocument>()
);

const validationNodeStore  = createStore(
  { name: 'validations'},
  withProps<DocumentProps>({ filter: 'ALL'}),
  withEntities<IValidationNode>()
);

@Injectable({ providedIn: 'root' })
export class DocumentRespository {
  documents$ = documentStore.pipe(selectAllEntities());
  filter$ = documentStore.pipe(select((state) => state.filter));

  addDocument(documents: IDocument | Array<IDocument>) {
    documentStore
    .update(addEntities(
      documents));
  }

  updateDocument(id: IDocument['id'], status: EDocumentStatus) {
    documentStore.update(
      updateEntities(id, (entity) => ({
        ...entity,
        status: status
      }))
    );
  }


}


