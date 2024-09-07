import { MembersInterface } from "../../interfaces/IMember";
import { MoviesInterface } from "../../interfaces/IMovie";  
import { ShowTimesInterface } from "../../interfaces/IShowtime"; // Import Interface ของ Showtimes

const apiUrl = "http://localhost:8000/api";

// ฟังก์ชันเพื่อดึงข้อมูลสมาชิกทั้งหมด
async function GetMembers() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/members`, requestOptions)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}

// ฟังก์ชันเพื่อดึงข้อมูลเพศทั้งหมด
async function GetGenders() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/genders`, requestOptions)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}

// ฟังก์ชันเพื่อลบสมาชิกตาม ID
async function DeleteMemberByID(id: Number | undefined) {
  const requestOptions = {
    method: "DELETE",
  };

  let res = await fetch(`${apiUrl}/members/${id}`, requestOptions)
    .then((res) => {
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    });

  return res;
}

// ฟังก์ชันเพื่อดึงข้อมูลสมาชิกตาม ID
async function GetMemberById(id: Number | undefined) {
  const requestOptions = {
    method: "GET",
  };

  let res = await fetch(`${apiUrl}/members/${id}`, requestOptions)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}

// ฟังก์ชันเพื่อสร้างสมาชิกใหม่
async function CreateMember(data: MembersInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/members`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

// ฟังก์ชันเพื่ออัปเดตข้อมูลสมาชิก
async function UpdateMember(data: MembersInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/members/${data.ID}`, requestOptions)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}

// ฟังก์ชันเพื่อดึงข้อมูลหนังทั้งหมด
async function GetMovies() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/movies`, requestOptions)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}

// ฟังก์ชันเพื่อดึงข้อมูลหนังตาม ID
async function GetMovieById(id: Number | undefined) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/movies/${id}`, requestOptions)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}

async function CreateMovie(formData: FormData) {
  const requestOptions = {
    method: "POST",
    body: formData,
  };

  let res = await fetch(`${apiUrl}/movies`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}


// ฟังก์ชันเพื่ออัปเดตข้อมูลหนัง
async function UpdateMovie(data: MoviesInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/movies/${data.ID}`, requestOptions)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}

// ฟังก์ชันเพื่อลบหนังตาม ID
async function DeleteMovieByID(id: Number | undefined) {
  const requestOptions = {
    method: "DELETE",
  };

  let res = await fetch(`${apiUrl}/movies/${id}`, requestOptions)
    .then((res) => {
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    });

  return res;
}

// ฟังก์ชันเพื่อดึงข้อมูล Showtimes ทั้งหมด
async function GetShowtimes() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/showtimes`, requestOptions)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}

// ฟังก์ชันเพื่อดึงข้อมูล Showtimes ตาม ID
async function GetShowtimeById(id: Number | undefined) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/showtimes/${id}`, requestOptions)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}

// ฟังก์ชันเพื่อสร้าง Showtimes ใหม่
async function CreateShowtime(data: ShowTimesInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/showtimes`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

// ฟังก์ชันเพื่ออัปเดตข้อมูล Showtimes
async function UpdateShowtime(data: ShowTimesInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/showtimes/${data.ID}`, requestOptions)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}

// ฟังก์ชันเพื่อลบ Showtimes ตาม ID
async function DeleteShowtimeByID(id: Number | undefined) {
  const requestOptions = {
    method: "DELETE",
  };

  let res = await fetch(`${apiUrl}/showtimes/${id}`, requestOptions)
    .then((res) => {
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    });

  return res;
}

export {
  GetMembers,
  CreateMember,
  GetGenders,
  DeleteMemberByID,
  GetMemberById,
  UpdateMember,
  GetMovies,
  GetMovieById,
  CreateMovie,
  UpdateMovie,
  DeleteMovieByID,
  GetShowtimes,
  GetShowtimeById,
  CreateShowtime,
  UpdateShowtime,
  DeleteShowtimeByID,
};
