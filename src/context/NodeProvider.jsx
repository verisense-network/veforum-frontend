import { createContext, useMemo, useContext, useCallback, useState, useEffect } from 'react';
import { ApiPromise, WsProvider, HttpProvider } from '@polkadot/api'


export const NodeContext = createContext({
	connectedNode:null
});

export default function NodeProvider(props) {
	const [connectedNode, setConnectedNode] = useState(null);
	console.log('api node', connectedNode);
	const connectWs = useCallback(async (node) => {
		if(connectedNode){
			return;
		}
		const wsProvider = new HttpProvider(node, 10000)
		const nodeIntance = await ApiPromise.create({
			provider: wsProvider,
			rpc: {
				nuclues:{
					nucleus_post:{
						isSubscription:true,
						jsonrpc:'nucleus_post',
						method: "nucleus_post",
						section:'broker',
						pubsub:['subscribeTrading', 'subscribeTrading', 'unsubscribeTrading'],
						description: 'subscribe trading data',
						params: [
							{
								name: 'dominator',
								type: 'AccountId'
							},
							{
								name: 'type',
								type: 'Bytes',
							},
							{
								name: 'data',
								type: 'Bytes',
							},
						],
						type: 'Bytes'
					},
				},
			},
		})
		setConnectedNode(nodeIntance)
		//return connectedNode
	},[connectedNode])

	useEffect(() => {
		if(connectedNode){
			return;
		}
		connectWs('http://localhost:9944')
	},[connectedNode])

	const value = useMemo(() => {
		return {
			api:connectedNode
		};
	}, [
		connectedNode
	]);

	return (
		<>
			<NodeContext.Provider value={value}>{props?.children}</NodeContext.Provider>
		</>
	);
}

export function useNodeContext(){
	return useContext(NodeContext)
}
