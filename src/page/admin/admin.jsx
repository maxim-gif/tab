import './admin.css';
import { AddList } from "../../components/addCurse/addCurse.jsx";
import { CurseList } from '../../components/cursesList/cursesList.jsx';
import { NameMembersList } from '../../components/nameMemberList/nameMemberList.jsx';
import { ModeratorList } from '../../components/moderators/moderators.jsx';


export const Admin = () => {

 
  return (
   <div className="admin">
    <div className="logo">  </div>
         <div className="modContain">
          <ModeratorList/>
          <NameMembersList/>
          <CurseList/>
          <AddList/>
        </div>
        
    </div>
  );
}
