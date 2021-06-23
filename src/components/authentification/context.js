import React,{Component} from 'react';
import firestore from "../../firebase"

const Context=React.createContext();

const reducer = (state,action)=>{
     
    switch(action.type){
        
        default:
        return state;
    }
}
export class Provider extends Component{

    constructor(){
        super()

       
    this.database=firestore.database().ref();
    this.authStateListner();
    }
       

 authStateListner=()=>{
    firestore.auth().onAuthStateChanged((user)=>{
             if(user){
                 this.setState({user:user});

                 this.database.child(this.state.user.uid).child("files").on('value',snap=>{
                    //console.log(snap.val())
                    let myArr=[]
        
                    console.log(snap.val())
                    for(const key in snap.val()){
                        myArr.push(Object.assign({},snap.val()[key].metadataFile,{key:key}));
                        console.log(snap.val()[key].metadataFile);
                    }

                    console.log("hey")
        
                    if(snap.val()!=null){
                        this.setState({
                            myFiles:myArr
                        })
                    }
                    else{
                        this.setState({
                            myFiles:[]
                        })
                    }
                   
                 });
                 
                 this.database.child(this.state.user.uid).child("log").on('value',snap=>{
                    //console.log(snap.val())
                    let myArr=[]
        
                    console.log(snap.val())
                    for(const key in snap.val()){
                        myArr.push(snap.val()[key].action);
                       // console.log(snap.val()[key].metadataFile);
                    }

                    console.log("hey")
        
                    if(snap.val()!=null){
                        this.setState({
                            logs:myArr
                        })
                    }
                    else{
                        this.setState({
                            logs:[]
                        })
                    }
                   
                 });
             }
             else{
                 this.setState({user:null,todos:[]})
             }
         })
      }
      componentDidMount(){

    
      
        

          
      }
    state={
      
        user:{},
        myFiles:[],
        logs:[],

        dispatch:action=>{
            this.setState(state=>reducer(state,action))
        }

    }

    render(){
        return(
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;