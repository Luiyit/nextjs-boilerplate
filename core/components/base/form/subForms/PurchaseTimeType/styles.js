import styled from 'styled-components';
import { Flex } from '../../../../styles/blocks';

export const Wrapper = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 36px;
`;

export const Buttons = styled.div`
  &&& {
    flex-basis: 100%;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: center;

    @media (min-width: 768px) {
      justify-content: flex-end;
    }
  }
`;

// TODO: refactoring important
export const RowWrapper = styled.div`
  display: flex;
  flex-basis: 100% !important;
  gap: 20px;
  flex-direction: column;
  margin-bottom: 14px;
`;

export const ColumnWrapper = styled(Flex)`
  flex-wrap: nowrap;
  gap: 20px;
  > div {
    width: 50%;
  }
  @media (max-width: 520px) {
    flex-wrap: wrap;
    > div {
      width: 100%;
    }
  }
`;
