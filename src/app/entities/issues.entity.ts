export class IssuesEntity {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: any;
  labels: Array<any>;
  state: string;
  locked: false;
  assignee: null;
  assignees: Array<any>;
  milestone: any;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: null;
  author_association: string;
  body: string;
}