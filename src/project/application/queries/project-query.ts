import { QueryManyRes } from 'src/common/dto/query-many.dto';
import { ProjectData } from './project-data';

export interface ProjectQuery {
  findById(projectId: string): Promise<ProjectData | undefined>;
  findMine(
    userId: string,
    current: number,
    pageSize: number,
  ): Promise<QueryManyRes<ProjectData>>;
}
