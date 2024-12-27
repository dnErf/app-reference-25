import { actions } from "astro:actions";

export { TestContainer }

interface ItemProps {
    title: string;
    price: number;
}

interface ContainerProps {
    items: ItemProps[]
}

function TestContainer({ items }: ContainerProps) {
    return (
        <table>
            <tbody>
            {
                items.map((item, idx) => (
                    <tr key={idx}>
                        <TestItem title={item.title} price={item.price} />
                    </tr>
                ))
            }
            </tbody>
        </table>
    )
}

function TestItem({ title, price }: ItemProps) {
    return (
        <>
            <td>
                { title }
            </td>
            <td>
                { price }
            </td>
            <td>
                <button onClick={(ev) => whenClicked(ev, title, price)}>
                    { title }
                </button>
            </td>
        </>
    )
}

async function whenClicked(ev, title, price) {
    let { data, error } = await actions.testAction({ title, price })
    if (error) {
        console.log(error)
    }
    else {
        console.log(data)
    }
}
