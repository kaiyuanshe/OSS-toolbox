import { debounce } from 'lodash';
import { Component } from 'react';
import { uniqueID } from 'web-utility';

import { SelectInput } from './SelectInput';

export interface CascadeProps {
  required: boolean;
}

interface LevelItem {
  label?: string;
  list: string[];
}

export abstract class CascadeSelect<
  P extends CascadeProps,
> extends Component<P> {
  UID = uniqueID();

  innerPath: string[] = [];

  list: LevelItem[] = [];

  get path() {
    return this.innerPath.filter(Boolean).slice(0, -1).join('/');
  }

  get name() {
    return this.innerPath.slice(-1)[0];
  }

  get pathName() {
    return this.innerPath.filter(Boolean).join('/');
  }

  reset() {
    const { innerPath, list } = this;

    this.innerPath = [innerPath[0]];
    this.list = [list[0]];
  }

  componentDidMount() {
    this.changeLevel(-1, '');
  }

  abstract getNextLevel(): Promise<LevelItem | undefined>;

  changeLevel = debounce(async (index: number, value: string) => {
    const { innerPath, list } = this;

    innerPath.splice(index, Infinity, value);

    const level = await this.getNextLevel();

    if (level != null) list.splice(++index, Infinity, level);
    else list.length = ++index;

    this.list = list;
  });

  render() {
    const { UID, list } = this,
      { required } = this.props;

    return (
      <>
        {list.map(({ label, list }, index) => {
          const IID = `input-${UID}-${index}`,
            LID = `list-${UID}-${index}`;

          return (
            <span key={IID} className="form-inline d-inline-flex">
              <SelectInput
                id={IID}
                options={list}
                onChange={({ currentTarget: { value } }) =>
                  (value = value.trim()) && this.changeLevel(index, value)
                }
                required={!index && required}
              />
              <label htmlFor={IID} className="pl-2 pr-2">
                {label}
              </label>
            </span>
          );
        })}
      </>
    );
  }
}
