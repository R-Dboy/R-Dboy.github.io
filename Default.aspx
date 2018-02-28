<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
              
            <asp:Label ID="lblList" runat="server" /> <br />
            <asp:TextBox ID="txtMovie" runat="server" /><br />
             &nbsp;&nbsp;&nbsp;
            <asp:Button ID="btnList" Text="List Movies" onclick="btnList_Click" runat="server" /> 
             &nbsp;&nbsp;&nbsp;
            <asp:Button ID="btnAdd" Text="Add Movie" OnClick="btnAdd_Click" runat="server" />
             &nbsp;&nbsp;&nbsp;
            <asp:Button ID="btnUpdate" Text="Update Move" OnClick="btnUpdate_Click" runat="server" />
             &nbsp;&nbsp;&nbsp;
            <asp:Button ID="btnDelete" Text="Delete Move" OnClick="btnDelete_Click" runat="server" />
             &nbsp;&nbsp;&nbsp;
            <asp:Button ID="btnSearch" Text="Search Movie Id" OnClick="btnSearch_Click" runat="server" />
        </div>
    </form>
</body>
</html>
