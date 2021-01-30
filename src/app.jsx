'use strict'
import React, {useEffect, useState} from 'react'
import IPFS from 'ipfs'

export default function App() {
    const [node, setNode] = useState(null)
    const [nodeInfo, setNodeInfo] = useState(null)
    const [update, setUpdate] = useState(false)
    const [articles, setArticles] = useState(null)
    const [articleCID, setArticleCID] = useState('bafyriqcdu5joxvs26abwz435rvc56bv3l2z2t6u6pids57c7kbfm7q74oh3svmw2oi3z4va5skh2u5ib2dxpjphtvdtvyfhj62nffkgxqo7aa')
    const [notice, setNotice] = useState('empty')

    useEffect(async () => {
        //Boot IPFS Browser Node
        console.log("Initialing Node......")
        const initNode = await IPFS.create({repo: String(Math.random() + Date.now())})
        setNode(initNode)
        //Get IPFS Node Info
        const {id, agentVersion, protocolVersion} = await initNode.id()
        setNodeInfo({id, agentVersion, protocolVersion})
        console.log({id, agentVersion, protocolVersion})
    }, [])

    useEffect(async () => {
        if (update) {
            console.log("update")
            //Begin to get Article
            const result = await node.dag.get(articleCID, '/')
            setArticles(result.value)
            //Finished
            setUpdate(false)
            setNotice('empty')
        }
    }, [update])

    const onclick = (event) => {
        event.preventDefault()
        setUpdate(true)
        setNotice('Updating...')
    }

    const onchange = (event) => {
        setArticleCID(event.target.value.toLocaleLowerCase().trim())
    }

    return (
        <div>
            {nodeInfo === null ? <h1> Waiting for IPFS node Bootstrap</h1> : <div>
                <h1>Everything is working!</h1>
                <p>Your ID is <strong>{nodeInfo.id}</strong></p>
                <p>Your IPFS version is <strong>{nodeInfo.agentVersion}</strong></p>
                <p>Your IPFS protocol version is <strong>{nodeInfo.protocolVersion}</strong></p>
                <hr/>
                <h4>Article CID</h4>
                <input type="text" value={articleCID} onChange={event => {
                    onchange(event)
                }}/>
                <button onClick={event => onclick(event)}>Update Articles</button>
                {articles !== null ?
                    <ul>
                        {articles.map(article => (<li key={article.title}>
                            <div>
                                <h4> {article.title}</h4>
                                <p> {article.content}</p>
                            </div>
                        </li>))}
                    </ul> : <h1>{notice}</h1>
                }
            </div>
            }
        </div>
    )
}
