import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";
import { useTransactions } from '../../hooks/useTransactions';
import { Container } from "./styles";

export function Sumary() {
   const { transactions } = useTransactions();

  
   const sumary = transactions.reduce((acc, transaction) => { 
      if (transaction.type === 'deposit') {
         acc.deposits += transaction.amount;
         acc.total += transaction.amount;

      } else {
         acc.withdraws += transaction.amount;
         acc.total   -= transaction.amount;
      }

      return acc;

   }, {
      deposits: 0,
      withdraws: 0,
      total: 0,
   })
   //TODO: fallback img + alt + rel
   return (
      <Container>        
         <div>
            <header>
               <p>Entradas</p>
               <img src={ incomeImg } alt="ícone de entradas" />
            </header>
            <strong>
            {new Intl.NumberFormat('pt-BR', {
               style: 'currency',
               currency: 'BRL'
            }).format(sumary.deposits)}
            </strong>
         </div>
         <div>
            <header>
               <p>Saídas</p>
               <img src={ outcomeImg } alt="ícone de saídas" />
            </header>
            <strong> -
            {new Intl.NumberFormat('pt-BR', {
               style: 'currency',
               currency: 'BRL'
            }).format(sumary.withdraws)}
            </strong>
         </div>
         <div className="highlight-background">
            <header>
               <p>Total</p>
               <img src={ totalImg } alt="ícone de total" />
            </header>
            <strong>
            {new Intl.NumberFormat('pt-BR', {
               style: 'currency',
               currency: 'BRL'
            }).format(sumary.total)}
            </strong>
         </div>
      </Container>
   );
}