<?php
namespace App\Http\Controllers;  // <== ini wajib

use Illuminate\Http\Request;
use App\Models\Menu;
use App\Models\Kategori;
use Illuminate\Support\Facades\Session;

class MenuController extends Controller
{
    public function home()
    {
        if (!Session::has('username')) {
            return redirect()->route('login');
        }

        $menus = Menu::all();
        return view('home', compact('menus'));
    }

    public function listMenus(Request $request)
    {
        if (!Session::has('username')) {
            return redirect()->route('login');
        }

        $id_kategori = $request->input('id_kategori', 1);
        $kategori = Kategori::find($id_kategori);
        $menus = Menu::where('id_kategori', $id_kategori)->get();

        return view('menu.list', [
            'menus' => $menus,
            'kategori_nama' => $kategori->nama_kategori ?? 'Kategori Tidak Ditemukan',
            'id_kategori' => $id_kategori
        ]);
    }

    public function viewMenuDetail($id)
    {
        $menu = Menu::find($id);

        if (!$menu) {
            return abort(404, 'Menu tidak ditemukan.');
        }

        return view('menu.detail', compact('menu'));
    }

    public function createMenu()
    {
        $kategori_result = Kategori::all();
        return view('menu.insert', compact('kategori_result'));
    }

    public function storeMenu(Request $request)
    {
        $request->validate([
            'nama_menu' => 'required|string',
            'bahan' => 'required|string',
            'resep' => 'required|string',
            'gambar' => 'image|mimes:jpeg,png,jpg|max:2048',
            'id_kategori' => 'required|integer'
        ]);

        $gambar = '';
        if ($request->hasFile('gambar')) {
            $gambar = $request->file('gambar')->store('uploads', 'public');
        }

        Menu::create([
            'nama_menu' => $request->nama_menu,
            'bahan' => $request->bahan,
            'resep' => $request->resep,
            'gambar' => $gambar,
            'id_kategori' => $request->id_kategori
        ]);

        return redirect()->route('menus.list', ['id_kategori' => $request->id_kategori]);
    }

    public function editMenu($id)
    {
        $menu = Menu::findOrFail($id);
        $kategori_result = Kategori::all();

        return view('menu.update', compact('menu', 'kategori_result'));
    }

    public function updateMenu(Request $request, $id)
    {
        $menu = Menu::findOrFail($id);

        $gambar = $menu->gambar;

        if ($request->hasFile('gambar')) {
            $gambar = $request->file('gambar')->store('uploads', 'public');
        }

        $menu->update([
            'nama_menu' => $request->nama_menu,
            'bahan' => $request->bahan,
            'resep' => $request->resep,
            'gambar' => $gambar,
            'id_kategori' => $request->id_kategori
        ]);

        return redirect()->route('menus.list', ['id_kategori' => $request->id_kategori]);
    }

    public function deleteMenu($id)
    {
        $menu = Menu::findOrFail($id);
        $menu->delete();

        return redirect()->route('menus.list');
    }
}