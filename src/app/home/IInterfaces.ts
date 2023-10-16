import { ISPUser } from "../shared/models";

type Nullable<T> = T | undefined | null;

export interface IState {
    documents: Array<IDocument>;
    settings: any;
  }

  export interface IDocument {
    id: string;
    name: string;
    url: string;
    title: string;
    status: any;
    currentActiveIndex: number;
    lastmodified: Date;
    modifiedBy: Nullable<ISPUser>;
    validationNodes: Nullable<Array<IValidationNode>>;
    actorsActions: Nullable<Array<IActorAction>>;
  }

  export class Document implements IDocument {
    id: string;
    name: string;
    url: string;
    title: string;
    status: any;
    currentActiveIndex: number;
    lastmodified: Date;
    modifiedBy: Nullable<ISPUser>;
    validationNodes: Nullable<Array<IValidationNode>>;
    actorsActions: Nullable<Array<IActorAction>>;

    constructor(title: string,
      url: string= '',
      name: string = '',
      currentActiveIndex: number= 0,
      id:string='',
      lastmodified:Date = new Date(0,0,1900),
      modifiedBy:Nullable<ISPUser> = null,
      validationNodes: Nullable<Array<IValidationNode>> = null,
      actorsActions: Nullable<Array<IActorAction>> = null) {

      this.title = title;
      this.url = url;
      this.name = name;
      this.currentActiveIndex = currentActiveIndex;
      this.id = id;
      this.lastmodified = lastmodified;
      this.modifiedBy = modifiedBy;
      this.validationNodes = validationNodes;
      this.actorsActions = actorsActions;
      this.status = EDocumentStatus.NEW;
    }
  }

  export const enum EDocumentStatus {
    VALID,
    ACTIVE,
    INCOMPLETE,
    INVALID,
    PAUSED,
    NEW
  }

  export interface IValidationNode {
    validationChainID: string;
    parentDocumentID: string;
    id: string;
    title: string;
    description: string;
    status: IStatus;
    actions: IActions;
    rules: IValidationRules;
    ifOK: IValidationNodeOKOutcome;
    ifKO: IValidationNodeKOOutcome;
  }

  export interface IActorAction {
    id: string;
    actorId: string;
    validationNodeId: string;
    validationChainID: string;
    parentDocumentID: string;
  }

  export interface IActions {
    status: Array<IStatus>;
    title: string;
    description: string;
    validationChainID: string;
    parentDocumentID: string;
  }

  export interface IValidationRules {
    isRequireAllOK: boolean;
    isRequireAllOKorReserved: boolean;
    isRequireAllAnswered: boolean;
    isBlockOnOneKO: boolean;
    isBlockOnMajorityKO: boolean;
    isPassOnOneOK: boolean;
  }

  export interface IValidationNodeOKOutcome {
    isGoToNext: boolean;
    isGoToIndex: boolean;
    goToIndex: boolean;
  }

  export interface IValidationNodeKOOutcome {
    isKOStopValidationChain: boolean;
    isKOStopValidationNodeOnly: boolean;
    isGoToPrecedent: boolean;
    isGoToSelf: boolean;
    isGoToIndex: boolean;
    goToIndex: number;
  }

  export interface IActor {
    identity: ISPUser;
  }

  enum StatusLabel {
    New,
    OK,
    KO,
    OKKO
  }

  export interface IStatus {
    label: StatusLabel;
    actor: IActor;
  }

  export interface DocumentProps {
    filter: 'ALL' | 'ACTIVE' | 'COMPLETED';
  }
