import { Loading } from 'idea-react';
import { observable } from 'mobx';
import { GitContent, RepositoryModel } from 'mobx-github';
import { observer } from 'mobx-react';
import { Component } from 'react';

import { SelectInput } from '../Form/SelectInput';

export interface PathSelectProps {
  repository: string;
  onChange?: (path: string) => any;
}

@observer
export class PathSelect extends Component<PathSelectProps> {
  repositoryStore?: RepositoryModel;

  get repository() {
    const [owner, name] = this.props.repository.split('/');

    return { owner, name };
  }

  @observable
  accessor fileLists: GitContent[][] = [];

  path: string[] = [];

  async componentDidMount() {
    const { owner, name } = this.repository;

    this.repositoryStore = new RepositoryModel(owner);

    this.fileLists = [await this.repositoryStore.getContents(name)];
  }

  componentDidUpdate({ repository }: Readonly<PathSelectProps>) {
    if (repository !== this.props.repository) this.componentDidMount();
  }

  async setPath({ type, name }: GitContent, index = 0) {
    this.path = [...this.path.slice(0, index), name];

    this.fileLists = this.fileLists.slice(0, index + 1);

    this.props.onChange?.(this.path.join('/'));

    if (type !== 'dir') return;

    const newList = await this.repositoryStore!.getContents(
      this.repository.name,
      this.path.join('/'),
    );
    this.fileLists = [...this.fileLists, newList];
  }

  render() {
    const { fileLists } = this,
      loading = this.repositoryStore?.downloading || 0;

    return (
      <div className="d-flex flex-wrap align-items-center gap-2">
        {loading > 0 && <Loading />}

        {fileLists.map((files, index) => (
          <>
            {!!index && <span>/</span>}
            <span>
              <SelectInput
                className="form-control"
                options={files.map(({ name }) => name)}
                onBlur={({ currentTarget: { value } }) => {
                  const file = files.find(({ name }) => name === value);

                  if (file) return this.setPath(file, index);
                }}
              />
            </span>
          </>
        ))}
      </div>
    );
  }
}
