
	var authIcons=new Array();
	authIcons[0]="images/Tmenu/Tblank.gif";
	authIcons[1]="images/Tmenu/TL.gif";
	authIcons[2]="images/Tmenu/TI.gif";
	authIcons[3]="images/Tmenu/TT.gif";
	authIcons[4]="images/Tmenu/Tminus1.gif";
	authIcons[5]="images/Tmenu/Tplus1.gif";
	authIcons[6]="images/Tmenu/Tminus.gif";
	authIcons[7]="images/Tmenu/Tplus.gif";
	var fcicon="images/Tmenu/Tfc.gif";
	var foicon="images/Tmenu/Tfo.gif";
	var nodelen=0;
	var authlen=0;
	var oldfocus=0;
	var nodelist=new Array();
	var authlist=new Array();
	
	function checkAllAuth(nid)
	{
		if (document.all["C"+nid])
		{
			selAllAuth(nid,document.all["C"+nid].checked);
		}
		fillCheckBox(findnode("0"));
	}
	
	function selAllAuth(nid,st)
	{
		if (document.all["C"+nid] && !document.all["C"+nid].disabled)
		{
			document.all["C"+nid].checked=st;
			setAuth(nid,st);
		}
		var nNode=findnode(nid);
		var cNode=nNode.firstChildNode;
		while (cNode)
		{
			selAllAuth(cNode.ID,st);
			cNode=cNode.nextNode;
		}
	}
	function setAuth(nid,st)
	{
		var i=0;
		for (i=0;i<authlen;i++)
		{
			if (authlist[i].MKID==nid && document.all["A"+authlist[i].ID])
			{
				document.all["A"+authlist[i].ID].checked=st;
			}
		}
	}
	
	function openchild(nid)
	{
		if (document.all["N"+nid+"_CHILD"])
		{
			document.all["N"+nid+"_CHILD"].style.display="";
			document.all["N"+nid+"_img"].src=minusicon;
		}
		Nnode=findnode(nid);
		if (Nnode)
		{
			openchild(Nnode.parentID);
		}
	}
	
	function showchild(Nodeid,iv)
	{
		if (document.all["N"+Nodeid+"_CHILD"])
		{
			if (document.all["N"+Nodeid+"_CHILD"].style.display=="")
			{
				document.all["N"+Nodeid+"_CHILD"].style.display="none";
				document.all["N"+Nodeid+"_img"].src=authIcons[iv];
				document.all["N"+Nodeid+"_img2"].src=fcicon;
			}
			else
			{
				document.all["N"+Nodeid+"_CHILD"].style.display="";
				document.all["N"+Nodeid+"_img"].src=authIcons[iv-1];
				document.all["N"+Nodeid+"_img2"].src=foicon;
			}
		}
		return false;
	}
	function lightNode(nid)
	{
		Nnode=findnode(nid);
		if  (Nnode) 
		{
			openchild(Nnode.parentID);
			nodeAction(nid);
		}
	}
	function nodeAction(nid)
	{
	}

	function newNode(NodeID,NodeText,ParentID,NodeAction,NodeImg)
	{
		var treeNode=new Object();
		treeNode.ID=NodeID;
		treeNode.Text=NodeText;
		treeNode.Action=NodeAction;
		treeNode.Img=NodeImg;
		treeNode.parentNode=0;
		treeNode.firstChildNode=0;
		treeNode.nextNode=0;
		treeNode.parentID=ParentID;
		treeNode.nextID="0";
		treeNode.addChild=addChildNode;
		treeNode.appendNode=appendTreeNode;		
		treeNode.hasAuth=hasAuth;		
		return treeNode;
	}

	function hasAuth()
	{
		var i=0;
		for (i=0;i<authlen;i++)
		{
			if (authlist[i].MKID==this.ID)
			{
				return true;
			}
		}
		return false;	
	}
	function newAuth(AID,MKID,QXMC,QXSM,PXM,CHK)
	{
		var authNode=new Object();
		authNode.ID=AID;
		authNode.MKID=MKID;
		authNode.QXMC=QXMC;
		authNode.QXSM=QXSM;
		authNode.PXM=PXM;
		authNode.CHK=(CHK=="1")?"checked":"";
		return authNode;
	}

	function appendTreeNode(Node)//增加节点（在本节点末尾）
	{
		Node.parentNode=this.parentNode;
		if (this.nextNode==0)
		{
			this.nextNode=Node;
			this.nextID=Node.ID;
			return true;
		}
		else
		{
			return this.nextNode.appendNode(Node);
		}
	}
	
	function addChildNode(Node)//在本节点下面
	{
		Node.parentNode=this;
		if (this.firstChildNode==0)
		{
			this.firstChildNode=Node;
			return true;
		}
		else
		{
			return this.firstChildNode.appendNode(Node);
		}
	}
	
	function loadAuthHtm(nid)
	{
		var sHtm="";
		var i=0;
		for (i=0;i<authlen;i++)
		{
			if (authlist[i].MKID==nid)
			{
				sHtm+='<input type=checkbox title="'+authlist[i].QXSM+'" id="A'+authlist[i].ID+'" '+authlist[i].CHK+' name=QXID value="'+authlist[i].ID+'" onclick="fillCheckBox(findnode(\'0\'));"><font title="'+authlist[i].QXSM+'">'+authlist[i].QXMC+'</font> '
			}
		}
		return sHtm;
	}
	function getTreeNodeHtml(Node,Level)
	{
		//alert(Node.ID+Level);
		var Htm;
		if (Node==0)
		{
			return "";
		}
		else
		{
			Htm='';
			var i=Level;
			pnode=Node;
			space="";
			Nvalue=0;
			for (i=Level;i>=1;i=i-1)
			{
				var iconV=0;
				if (pnode.firstChildNode && i==Level) iconV+=4;
				if (pnode.nextNode) iconV+=2;
				if (i==Level) iconV+=1;
				if (iconV>Nvalue)Nvalue=iconV;
				if(iconV>3)
				{
					space="<img class='NODEIMG' id='N"+Node.ID+"_img' src='"+authIcons[iconV]+"' onClick=showchild('"+Node.ID+"',"+iconV+") align=absMiddle>"+
					"<img class='NODEIMG' id='N"+Node.ID+"_img2' src='"+fcicon+"' onClick=showchild('"+Node.ID+"',"+iconV+") align=absMiddle>"+space;
				}
				else
				{if (i==Level && pnode.Img && pnode.Img!="")
					{
						space="<img class='NODEIMG1' src='"+authIcons[iconV]+"' align=absMiddle>"+
						"<img class='NODEIMG' src='images/Tmenu/"+pnode.Img+"' align=absMiddle>"+space;
					}
					else
					{
						space="<img class='NODEIMG1' src='"+authIcons[iconV]+"' align=absMiddle>"+space;
					}
				}
					pnode=pnode.parentNode;
			}
			Htm+=space+'<input type=checkbox id="C'+Node.ID+'" onclick="checkAllAuth('+Node.ID+')" '+((!Node.firstChildNode && !Node.hasAuth())?'disabled':'')+'>';
			Htm+='<font id="T'+Node.ID+'" target=main nowrap CLASS="'+((Nvalue>3)?'NODETITLE':'NODETEXT')+'" onclick="'+
			((Nvalue>3)?('showchild(\''+Node.ID+'\','+Nvalue+')'):('nodeAction(\''+Node.ID+'\')'))+
			'" align=absMiddle>'+Node.Text+'</font> ';
			Htm+=loadAuthHtm(Node.ID);
			Htm+='<br>\n';
				if (Node.firstChildNode!=0)
				{
					Htm+='<DIV nowrap CLASS="TREECLASS" id="N'+Node.ID+'_CHILD" style="display:none">';
					Htm+=getTreeNodeHtml(Node.firstChildNode,Level+1);
					Htm+="</DIV>";
				}
				if (Node.nextNode!=0)
				{
					Htm+=getTreeNodeHtml(Node.nextNode,Level);
				}
		}
		//alert(Htm);
		return Htm;
	}
	function findnode(nodeID)
	{
		var i=0;
		for (i=0;i<nodelen;i=i+1)
		{
			if (nodelist[i].ID==nodeID)
			{
				return nodelist[i];
			}
		}
		return null;
	}
	function locate(lID)
	{
		alert(lID);
	}
	function drawTree(divname)
	{
		var i=0;
		for (i=0;i<nodelen;i=i+1)
		{
			if (nodelist[i].parentID!="-1")
			{
				node=findnode(nodelist[i].parentID);
				node.addChild(nodelist[i]);
			}
		}
		 if (document.all[divname]) document.all[divname].innerHTML=getTreeNodeHtml(findnode("0").firstChildNode,1);
		 if (document.all[divname+"_HTM"]) document.all[divname+"_HTM"].value=getTreeNodeHtml(findnode("0").firstChildNode,1);
	}
	function fillCheckBox(Node)
	{
		var fillState=0;
		if (Node)
		{
			var nid=Node.ID;
			if (Node.firstChildNode)
			{
				fillState=fillCheckBox(Node.firstChildNode)
			}
			else
			{
				fillState=checkAuthFill(nid);
			}
			if (document.all["C"+nid] && fillState!=-1)
			{
				if (fillState==2)
				{
					document.all["C"+nid].indeterminate=false;
					document.all["C"+nid].checked=true;
				}
				else if (fillState==1)
				{
					document.all["C"+nid].indeterminate=true;
					document.all["C"+nid].checked=true;
				}
				else	
				{
					
					document.all["C"+nid].indeterminate=false;
					document.all["C"+nid].checked=false;
				}
			}
			if (Node.nextNode)
			{
				var broState=fillCheckBox(Node.nextNode);
				if (broState==-1)
				{
					fillState=fillState;
				}
				else if (fillState==0 && broState==0)
				{
					fillState=0
				}
				else if (fillState==2 && broState==2)
				{
					fillState=2;
				}
				else
				{
					fillState=1;
				}
			}
		}
		return fillState;
	}
	function checkAuthFill(nid)
	{
		var i=0;
		var alen=0;
		var calen=0;
		if (document.all["C"+nid] && document.all["C"+nid].disabled)
		{
			return -1;
		}
		
		for (i=0;i<authlen;i++)
		{
			if (authlist[i] && authlist[i].MKID==nid)
			{
				alen++;
				if (document.all["A"+authlist[i].ID] && document.all["A"+authlist[i].ID].checked)
				{
					calen++;
				}
			}
		}
		if (calen==0) return 0;
		else if (alen!=calen) return 1;
		else if (alen>0) return 2;
		else return 0;
	}