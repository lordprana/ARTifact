import axios from 'axios';

const STOCK_PIECE = 'STOCK_PIECE';

const stockPiece = (piece) => {
    return {
        type: STOCK_PIECE,
        piece
    }
}
export default function reducer(piece = null, action) {
    switch (action.type) {
      case STOCK_PIECE:
        return action.piece;
      default:
        return piece;
    }
  }
