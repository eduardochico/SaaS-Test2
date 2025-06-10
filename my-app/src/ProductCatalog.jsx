import './ProductCatalog.css';

export default function ProductCatalog() {
  const products = [
    { id: 1, name: 'Widget', price: '$10.00' },
    { id: 2, name: 'Gadget', price: '$12.50' },
    { id: 3, name: 'Thingamajig', price: '$7.25' },
  ];

  return (
    <div className="catalog">
      <h2>Product Catalog</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            <span className="name">{p.name}</span>
            <span className="price">{p.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
