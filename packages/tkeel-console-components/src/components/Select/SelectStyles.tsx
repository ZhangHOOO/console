import 'rc-select/assets/index.less';

import { Theme, useTheme } from '@chakra-ui/react';
import { css, Global } from '@emotion/react';

import { SelectExtrasProps } from './types';

interface Props extends SelectExtrasProps {
  prefixCls: string;
}

type CustomTheme = Theme & {
  colors: {
    primary: string;
    primarySub: string;
    grayAlternatives: {
      50: string;
      700: string;
    };
  };
};

export default function SelectStyles({ prefixCls, styles }: Props) {
  const selectPrefix = prefixCls;
  const { colors }: CustomTheme = useTheme();
  const globalStyles = css`
    * {
      box-sizing: border-box;
    }
    .${selectPrefix} {
      width: inherit;

      &-single {
        .${selectPrefix}-selector {
          position: relative;
          display: flex;
          border-radius: 4px;
          cursor: pointer;
          ${styles?.selector}
          .${selectPrefix}-selection-search {
            width: 100%;
            padding: 8px 16px;
            font-size: 14px;
            line-height: 24px;
            ${styles?.selectionSearch}
            &-input {
              width: 100%;
              pointer-events: none;
            }
          }

          .${selectPrefix}-selection-item,
            .${selectPrefix}-selection-placeholder {
            position: absolute;
            top: 8px;
            left: 16px;
            color: ${colors.grayAlternatives[700]};
            cursor: pointer;
            pointer-events: none;
          }

          .${selectPrefix}-selection-item {
            ${styles?.selectionItem}
          }
        }

        &:not(.${selectPrefix}-customize-input) {
          .${selectPrefix}-selector {
            border-width: 1px;
            border-style: solid;
            font-size: 14px;
            line-height: 24px;
            border-color: ${colors.grayAlternatives[50]};
            ${styles?.selector}
          }
        }
      }

      &-multiple .${selectPrefix}-selector {
        padding: 8px 16px;
        font-size: 14px;
        line-height: 24px;
        border: 1px solid ${colors.primary};
        border-radius: 4px;
        ${styles?.selector}

        .${selectPrefix}-selection-placeholder {
          position: absolute;
          top: 8px;
          left: 16px;
          color: ${colors.grayAlternatives[700]};
          font-size: 14px;
          line-height: 24px;
          cursor: pointer;
          pointer-events: none;
        }
        .${selectPrefix}-selection-item {
          flex: none;
          margin-right: 2px;
          padding: 4px;
          color: ${colors.primary};
          font-weight: 500;
          background: ${colors.primarySub};
          ${styles?.selectionItem}

          &-disabled {
            cursor: not-allowed;
            opacity: 0.5;
          }
        }
        .${selectPrefix}-selection-overflow {
          cursor: pointer;

          &-item {
            height: 24px;
            .${selectPrefix}-selection-item {
              &-remove {
                margin-left: 3px;
                font-size: 18px;
                cursor: pointer;
              }
            }
          }
        }
        .${selectPrefix}-selection-overflow-item-suffix {
          .${selectPrefix}-selection-search {
            ${styles?.selectionSearch}
            .${selectPrefix}-selection-search-input {
              height: 24px;
              margin-top: 1px;
              color: ${colors.primary};
              background-color: ${colors.primarySub};
            }
          }
        }
      }

      &-focused {
        .${selectPrefix}-selector {
          border-color: ${colors.primary} !important;
        }
      }

      &-allow-clear {
        &.${selectPrefix}-multiple .${selectPrefix}-selector {
          padding-right: 20px;
        }

        .${selectPrefix}-clear {
          top: 7px;
          right: 40px;
          color: ${colors.gray[400]};
          font-size: 18px;
          cursor: pointer;
        }
      }

      &-show-arrow {
        &.${selectPrefix}-multiple .${selectPrefix}-selector {
          padding-right: 20px;
        }

        .${selectPrefix}-arrow {
          right: 16px;
          top: 14px;
          ${styles?.arrow}
        }
      }

      &-dropdown {
        border: 1px solid ${colors.gray[200]};
        min-height: 60px;
        border-radius: 4px;
        padding: 16px 12px;
        color: ${colors.gray[700]};
        box-shadow: 0 2px 10px ${colors.gray[100]};
        z-index: 1400;
        ${styles?.dropdown}
      }

      &-item {
        padding: 5px;
        font-size: 14px;
        line-height: 32px;
        cursor: pointer;
        ${styles?.selectItem}

        &-group {
          color: #999;
          font-weight: bold;
          font-size: 80%;
        }

        &-option {
          position: relative;

          &-selected {
            color: ${colors.primary};
          }

          .${selectPrefix}-item-option-state {
            right: 4px;
            top: 2px;
            ${styles?.itemOptionState}
          }

          &-active {
            color: ${colors.primary};
            background: ${colors.primarySub};
          }

          &-disabled {
            color: ${colors.gray[300]};
          }
        }

        &-empty {
          color: #999;
          text-align: center;
        }
      }
    }
    .${selectPrefix}-tree-node {
      .${selectPrefix}-tree-iconEle {
        display: 'none' !important;
      }
    }
  `;

  return <Global styles={globalStyles} />;
}
