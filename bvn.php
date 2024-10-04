 <?php


    function getGrou($wallet, $group_id)
    {
        //dd($request);
        $user = Wallet::where('code', $wallet)->first();
        if ($user) {
        } else {
            return false;
        }
        $user_id = $user->user_id;
        $data = Product_commision::where('group_id', $group_id)->get();
        if ($data) {
            // dd($data);
            foreach ($data as $item) {
                //dd($item);
                $category_id = $item->product_id;

                $check = Commission_detail::where('user_id', $user_id)->where('category_id', $category_id)->exists();
                if ($check) {
                    $insert = Commission_detail::where('user_id', $user_id)->where('category_id', $category_id)->first();
                    $insert->user_id = $user_id;
                    $insert->category_id = $category_id;
                    $insert->value = $item->value;
                    $insert->save();
                    // return redirect()->back()->with('status', 'updated successfully');
                } else {
                    $insert = new Commission_detail([
                        'user_id' => $user_id,
                        'category_id' => $category_id,
                        'value' => $item->value
                    ]);
                    $insert->save();
                    //   return redirect()->back()->with('status', 'inserted successfully');
                }
            }
            Log:
            info($group_id);
            $agent = User::find($user->user_id);
            $agent->group_id = $group_id;
            $agent->save();
            return true;
        } else {

            return false;
        }
    }