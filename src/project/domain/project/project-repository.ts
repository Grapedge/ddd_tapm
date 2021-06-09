import { Project } from './project';
import { ProjectId } from './project-id';

export interface ProjectRepository {
  nextId(): ProjectId;
  findById(id: ProjectId): Promise<Project | undefined>;
  save(project: Project): Promise<void>;
}
